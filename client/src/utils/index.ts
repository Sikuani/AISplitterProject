import { instructions } from './instructions';

const MAX_CHUNK_SIZE = 3970;

export const createChunk = (inputText: string) => {
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

  return newChunks;
};

export const copyChunks = (index: number, chunks: string[]) => {
  navigator.clipboard.writeText(chunks[index]);
};

export const copyInstructions = (chunks: string[]) => {
  navigator.clipboard.writeText(instructions(chunks));
}

