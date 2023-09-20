import { useState, useContext } from "react";
import axios from "axios";
import { AuthTokenContext } from "../../context/AuthTokenContext";
import { instructions } from "../../utils/instructions";
import { createCollection } from "../../utils/api";


const MAX_CHUNK_SIZE = 3970;

//1. create a form that allows the user to input a large block of text
const TextSplitter = () => {  
  const [inputText, setInputText] = useState("");
  const { getToken } = useContext(AuthTokenContext);
  const [chunks, setChunks] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

//3. Split the user's input into the chuncks of text less than 4000 characters.
  const splitText = async () => {
    if (!inputText || inputText.length < MAX_CHUNK_SIZE) {
      alert(`Please enter at lease ${MAX_CHUNK_SIZE} characters`);
      return;
    }

    const collectionID = await createCollection(inputText);

    try {
      const response = await axios(`/api/collection/${collectionID}/text`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        data: {
          text: inputText,
        },
      });

      createChunk();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  const createChunk = () => {
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

  const copyChunks = (index: number) => {
    navigator.clipboard.writeText(chunks[index]);
  };

  const copyInstructions = () => {
    navigator.clipboard.writeText(instructions(chunks));
  }

  const clearChat = () => {
    setInputText("");
    setChunks([]);

  }

//4. Display buttons on the screen so the user can select the each chunk of text
  return (
    <>
      <div className="p-6">
        <fieldset>
          <legend className="text-sm text-black flex justify-between w-full">
            Paste Text Here
            <span className="text-right">
              Character Count: {inputText.length}
            </span>
          </legend>

          <textarea
            name="text"
            id="text"
            value={inputText}
            onChange={handleInputChange}
            className="w-[92%] h-32 p-2 m-4 resize-none border-2 border-gray-300 rounded-md"
          />
        </fieldset>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline shadow-md"
          onClick={splitText}
        >
          Split!
        </button>
        {chunks.length > 0 && (
          <>
            <div className="instructions mt-4 flex flex-col">
              <fieldset className="bg-slate-300 p-4">
                <legend className="text-black p-1 bg-slate-400 rounded-sm">Instructions</legend>
                <p className="text-black">{instructions(chunks)}</p>
              </fieldset>
              <button className="bg-green-400 hover:bg-green-700 text-black font-bold py-2 px-4 rounded shadow-md mt-3 m-auto" onClick={copyInstructions}>Copy instructions (First message to send)</button>
            </div>

            <div className="chunksButtons mt-4 flex flex-wrap justify-center gap-3">
              {chunks.map((_, index) => (
                <button
                  key={`chunk-${index}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                  onClick={() => copyChunks(index)}
                >
                  Copy Chunk {index + 1} to Clipboard
                </button>
              ))}
            </div>
            <div className="clearChat mt-4 flex">
              <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-8 rounded shadow-md m-auto" onClick={clearChat}>Clear Chat</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TextSplitter;
