import { instructions } from "../../utils/instructions";
import { copyInstructions } from '../../utils/index';

function Instructions({ chunks }: { chunks: string[] }) {
  return (
    <div className="instructions mt-4 flex flex-col p-2 m-4">
      <fieldset className="bg-slate-300 p-4">
        <legend className="text-black p-1 bg-slate-400 rounded-sm">
          Instructions
        </legend>
        <p className="text-black">{instructions(chunks)}</p>
      </fieldset>
      <button
        className="bg-green-400 hover:bg-green-700 text-black font-bold py-2 px-4 rounded shadow-md mt-3 m-auto"
        onClick={() => copyInstructions(chunks)}
      >
        Copy instructions (First message to send)
      </button>
    </div>
  );
}

export default Instructions;

