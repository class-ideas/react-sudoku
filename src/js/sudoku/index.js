import boards from './boards';

export function getRandomBoard() {
  let idx = Math.floor( Math.random() * boards.length )
  return boards[idx].split('').map(x => x === '0' ? '\u00a0' : x);
}

export { getRelatedCells } from './cell-utils';
