import { instructions } from './instructions';

const MAX_CHUNK_SIZE = 3970;

export const createChunk = (inputText: string | undefined) => {
  
  const newChunks: string[] = [];

  const size = Math.ceil(inputText.length / MAX_CHUNK_SIZE);
  let index = 0;

  for (let i = 0; i < inputText.length; i += MAX_CHUNK_SIZE) {
    const chunk = 
    `[START PART ${index + 1}/${size}]` + 
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

