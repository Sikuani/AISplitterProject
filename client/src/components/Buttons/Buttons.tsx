import { copyChunks } from "../../utils"

function Buttons({ chunks }: { chunks: string[] }) {
  return (
    <div>
      <div className="chunksButtons mt-4 flex flex-wrap justify-center gap-3">
              {chunks.map((_, index) => (
                <button
                  key={`chunk-${index}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                  onClick={() => copyChunks(index, chunks)}
                >
                  Copy Chunk {index + 1} to Clipboard
                </button>
              ))}
            </div>
            
    </div>
  )
}

export default Buttons