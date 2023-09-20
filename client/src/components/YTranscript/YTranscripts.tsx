import { createCollection, addTextToCollectionAPI } from "../../utils/api";
import { useState } from "react";
import axios from "axios";
import Instructions from "../Instructions/Instructions";
import Buttons from "../Buttons/Buttons";

const MAX_CHUNK_SIZE = 3970;

// The user provides a link to a YouTube video.
// The UI creates a collection.

// Your UI will make API requests to save the large block to text to history.
// Your UI will break the text pieces that are less than 4,000 characters and share this with the user.

function YTranscripts() {
  const [url, setUrl] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [transcriptText, setTranscriptText] = useState("");

  const generateTranscript = async () => {
    //1. The UI create a collection.
    if (!url) {
      alert("Please enter a YouTube URL");
      return;
    }

    const colletionID = await createCollection(url);

    // Your UI makes a request to /api/youtube-transcript?url={youtubeUrl} to generate a YouTube transcript for the video.
    try {
      const response = await axios.get(`/api/youtube-transcript?url=${url}`);
      const { result } = response.data;
      const transcript: string[] = result.map((arrayText) => {
        return arrayText.text;
      });

      //Transcript array convert to text
      setTranscriptText(transcript.join("\n"));

      // store the text to collection
      const transcription = transcript.join("\n");
      setTranscriptText(transcription);

      await addTextToCollectionAPI(transcription, colletionID);
      createChunks(transcription);
    } catch (error) {
      console.log(error);
    }
  };

  const createChunks = (inputText: string) => {
    /**
     * TODO:
     * 1. Create a newChuncks array to store the chunks
     * 2. Iterate through the inputText and create a new chunk and push it to the newChuncks array.
     * 3. Set the newChuncks to the chunk state
     *
     */

    const newChunks = [];

    const size = Math.ceil(inputText.length / MAX_CHUNK_SIZE);
    let index = 0;

    for (let i = 0; i < inputText.length; i += MAX_CHUNK_SIZE) {
      const chunk =
        `[STAR PART ${index + 1}/${size}]` +
        inputText.substring(i, i + MAX_CHUNK_SIZE) +
        `[END PART ${index + 1}/${size}]`;
      newChunks.push(chunk);
      index++;
    }
    setChunks(newChunks);
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
          <legend className="text-sm text-black flex justify-between w-full">
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
