import boards from './boards';

export const EMPTY_CHAR = '\u00a0';

export function getRandomBoard() {
  let idx = Math.floor( Math.random() * boards.length )
  return boards[idx].split('').map(x => x === '0' ? EMPTY_CHAR : x);
}

export function isEntryValid(entry) {
  return [..."123456789"].includes(entry);
}

export { getRelatedCells } from './cell-utils';
