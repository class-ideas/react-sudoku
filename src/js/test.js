// Javascript Entry Point

import { getRandomBoard } from './sudoku';
import boards from './sudoku/boards';

import * as cell from './sudoku/cell-utils';

// let board = getRandomBoard();
let board = boards[19].split('');

let ci = 80;

console.log('cell index', ci);
console.log('cell val', board[ci]);
console.log('row 3', cell.getRowNumber(ci))
console.log('col 1', cell.getColNumber(ci))
console.log('row cells', cell.getCellsInRow((ci), board));
console.log('col cells', cell.getCellsInCol((ci), board));
console.log('box row', cell.getBoxRowNumber((ci), board));
console.log('box col', cell.getBoxColNumber((ci), board));
console.log('box cells', cell.getCellsInBox((ci), board));

let relatedCells = cell.getRelatedCells(ci, board);

console.log('related cells', relatedCells);

let html = '';
let idx = 0;
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    let color = 'black';
    if ( idx === ci ) {
      color = 'red';
    } else if ( relatedCells.indices.includes(idx) ) {
      color = 'orange';
    }
    html += ` <span style="color: ${color}">${board[idx]}</span> |`;
    idx++;
  }
  html += '<br>';
}
document.write(html);
