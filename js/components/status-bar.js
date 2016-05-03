import React, { Component } from 'react';
import { EMPTY_CHAR } from '../sudoku';

export default class Game extends Component {
  render() {
    let { board, onNewGame } = this.props;
    let emptyCount = board.filter( x => x === EMPTY_CHAR ).length;

    if (!emptyCount) {
      return (
        <div className="game-status">
          <span>Great Job!!</span>
          <span className="link" onClick={onNewGame}>Play Next Board</span>
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
}
