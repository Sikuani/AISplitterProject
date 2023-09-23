import { createCollection, addTextToCollectionAPI } from "../../utils/api";
import { useState } from "react";

import Instructions from "../Instructions/Instructions";
import Buttons from "../Buttons/Buttons";
import { getTranscript } from "../../utils/api";
import { createChunk } from "../../utils/index";

function YTranscripts() {
  const [url, setUrl] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [transcriptText, setTranscriptText] = useState<string>("");

  const generateTranscript = async () => {
    if (!url) {
      alert("Please enter a YouTube URL");
      return;
    }

    const colletionID = await createCollection(url);

    const transcript = await getTranscript(url);
    if (!transcript) return;

    setTranscriptText(transcript);
    await addTextToCollectionAPI(transcript, colletionID);
    setChunks(createChunk(transcript));
  };

  const clearChat = () => {
    setTranscriptText("");
    setChunks([]);
    setUrl("");
  };

  return (
    <div>
      <h1 className="text-3xl">Youtube Transcripts</h1>

      <div className="inputYTTranscript my-4 p-6 flex flex-col">
        <fieldset className="mb-4">
          <legend className="text-sm  flex justify-between w-full">
            YouTube URL
            <span className="text-right">
              Character Count: {transcriptText.length}
            </span>
          </legend>
          <input
            type="text"
            value={url}
            className="w-full bg-gray-50"
            onChange={(e) => setUrl(e.target.value)}
          />
        </fieldset>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto"
          onClick={generateTranscript}
        >
          Generate Transcript
        </button>
      </div>
      {transcriptText.length > 0 && (
        <div>
          <div>
            <p className="overflow-y-scroll w-[92%] h-32 p-2 m-4 resize-none border-2 border-gray-300 rounded-md text-justify">
              {transcriptText}
            </p>
          </div>
          <Instructions chunks={chunks} />
          <Buttons chunks={chunks} />
          <div className="clearChat mt-4 flex">
            <button
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-8 rounded shadow-md m-auto"
              onClick={clearChat}
            >
              Clear Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default YTranscripts;
