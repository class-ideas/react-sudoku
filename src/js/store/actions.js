import { getRandomBoard, getRelatedCells } from '../sudoku';
import store from './';

export const NEW_GAME       = Symbol('NEW_GAME');
export const ACTIVATE_CELL  = Symbol('ACTIVATE_CELL');
export const UPDATE_CELL   = Symbol('UPDATE_CELL');

export function newGame() {
  const board = getRandomBoard();
  const frozen = board.map((x,i) => {
    return [..."123456789"].includes(x) ? i : -1;
  }).filter(x => x >= 0);

  return { type: NEW_GAME, board, frozen };
}

export function activateCell(cellIndex) {
  let { values, indices } = getRelatedCells(cellIndex, store.getState().board);
  return { type: ACTIVATE_CELL, cellIndex, highlight: indices, prevent: values }
}

export function updateCell(cellIndex, value) {
  if (!value) {
    value = '\u00a0';
  }
  return { type: UPDATE_CELL, cellIndex, value }
}
