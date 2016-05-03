import React, { Component } from 'react';
import Board from './board';
import StatusBar from './status-bar';
import { getRandomBoard, getRelatedCells, isEntryValid, EMPTY_CHAR }
  from '../sudoku';

export default class Game extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      board: [],
      frozen: [],
      highlight: [],
      prevent: [],
      active: null,
      duplicate: null
    }
  }

  newGame() {
    const board = getRandomBoard();
    const frozen = board.map((x, i) => {
      return isEntryValid(x) ? i : -1;
    }).filter(x => x >= 0);

    this.setState({board, frozen});
  }

  activateCell(cellIndex) {
    let { values, indices } = getRelatedCells(cellIndex, this.state.board);
    this.setState({ active: cellIndex, highlight: indices, prevent: values });
  }

  updateCell(cellIndex, value) {
    let { board } = this.state;
    board[cellIndex] = value || EMPTY_CHAR;

    this.setState({
      board,
      active: null ,
      prevent: [],
      highlight: []
    });
  }

  componentWillMount() {
    this.newGame();
  }

  activateHandler(index) {
    this.activateCell(index);
  }

  updateHandler(index, value) {
    this.updateCell(index, value);
  }

  duplicateHandler(value) {
    this.setState({duplicate: value});
    setTimeout(() => {
      this.setState({duplicate: null});
    }, 300);
  }

  render() {
    let { board, frozen, highlight, prevent, active, duplicate } = this.state;
    return (
      <div>
        <h1>Sudoku</h1>
        <StatusBar
          board={board}
          onNewGame={() => this.newGame()}
        />
        <Board
          data={board}
          frozen={frozen}
          highlight={highlight}
          prevent={prevent}
          active={active}
          duplicate={duplicate}
          onActivate={::this.activateHandler}
          onUpdate={::this.updateHandler}
          onDuplicate={::this.duplicateHandler}
        />
      </div>
    )
  }
}
