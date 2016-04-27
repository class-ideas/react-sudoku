import { BOARD_SIZE, BOX_SIZE } from './constants';

function range(start, stop) {
  if (!stop) {
    stop = start;
    start = 0;
  }
  return Array.apply(null, {length: stop - start}).map((_, i) => i + start);
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

export function getRowNumber(cellIndex) {
  return Math.floor(cellIndex / BOARD_SIZE);
}

export function getColNumber(cellIndex) {
  return cellIndex % BOARD_SIZE;
}

export function getBoxRowNumber(cellIndex) {
  let rowNumber = getRowNumber(cellIndex);
  return Math.floor(rowNumber / BOX_SIZE);
}

export function getBoxColNumber(cellIndex) {
  let colNumber = getColNumber(cellIndex);
  return Math.floor(colNumber / BOX_SIZE);
}

export function getBoxIndex(cellIndex) {
  let boxRowNum = getBoxRowNumber(cellIndex);
  let boxColNum = getBoxColNumber(cellIndex);
  return (boxRowNum * BOX_SIZE) + boxColNum;
}

export function getCellsInRow(cellIndex, allCells) {
  let rowNumber = getRowNumber(cellIndex);
  let start = (rowNumber + 0) * BOARD_SIZE;
  let stop  = (rowNumber + 1) * BOARD_SIZE;
  return { values: allCells.slice(start, stop), indices: range(start, stop) };
}

export function getCellsInCol(cellIndex, allCells) {
  let colNumber = getColNumber(cellIndex);
  let cellsInCol = [];
  let indicesInCol = []
  for (let i = colNumber; i < BOARD_SIZE**2; i += BOARD_SIZE) {
    cellsInCol.push( allCells[i] );
    indicesInCol.push(i);
  }
  return { values: cellsInCol, indices: indicesInCol };
}

export function getCellsInBox(cellIndex, allCells) {
  let cellsInBox = [];
  let indicesInBox = [];

  let boxRowNum = getBoxRowNumber(cellIndex);
  let boxColNum = getBoxColNumber(cellIndex);

  for (let i = 0; i < BOX_SIZE; i++) {
    let start = ((boxColNum + 0) * BOX_SIZE) + (boxRowNum * (BOARD_SIZE * BOX_SIZE)) + (i * BOARD_SIZE);
    let stop  = ((boxColNum + 1) * BOX_SIZE) + (boxRowNum * (BOARD_SIZE * BOX_SIZE)) + (i * BOARD_SIZE);
    cellsInBox = cellsInBox.concat(allCells.slice(start, stop));
    indicesInBox = indicesInBox.concat(range(start, stop));
  }

  return { values: cellsInBox, indices: indicesInBox };
}

export function getRelatedCells(cellIndex, allCells) {
  let cellsInRow = getCellsInRow(cellIndex, allCells);
  let cellsInCol = getCellsInCol(cellIndex, allCells);
  let cellsInBox = getCellsInBox(cellIndex, allCells);

  let values  = uniq([].concat(cellsInRow.values, cellsInCol.values, cellsInBox.values));
  let indices = uniq([].concat(cellsInRow.indices, cellsInCol.indices, cellsInBox.indices));

  return {values, indices};
}
