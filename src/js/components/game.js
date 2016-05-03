import React, { Component } from 'react';
import Board from '../components/board';
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
      active: null
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

  getStatusBar() {
    let emptyCount = this.state.board.filter(x => !isEntryValid(x)).length;
    let complete = emptyCount === 0;
    if (complete) {
      return (
        <div className="game-status">
          <span>Great Job!!</span>
          <span className="link" onClick={() => this.newGame()}>Play Next Board</span>
        </div>
      )
    } else {
      return (
        <div className="game-status">
          <span>Slots left: {emptyCount}</span>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Sudoku</h1>
        {this.getStatusBar()}
        <Board
          data={this.state.board}
          frozen={this.state.frozen}
          highlight={this.state.highlight}
          prevent={this.state.prevent}
          active={this.state.active}
          onActivate={::this.activateHandler}
          onUpdate={::this.updateHandler}
        />
      </div>
    )
  }
}
