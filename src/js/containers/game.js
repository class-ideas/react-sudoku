import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../components/board';
import { newGame, activateCell, updateCell } from '../store/actions';

@connect(state => ({
  board: state.board,
  frozen: state.frozen,
  active: state.activeCellIndex,
  highlight: state.highlight,
  prevent: state.prevent
}))
export default class Game extends Component {
  componentWillMount() {
    let { dispatch } = this.props;
    dispatch(newGame());
  }

  activateHandler(index) {
    let { dispatch } = this.props;
    dispatch(activateCell(index));
  }

  updateHandler(index, value) {
    let { dispatch } = this.props;
    dispatch(updateCell(index, value));
  }

  computeEmptySlots() {
    return this.props.board.filter(x => ![...'123456789'].includes(x)).length;
  }

  getStatusBar() {
    let emptyCount = this.props.board.filter(x => ![...'123456789'].includes(x)).length;
    let complete = emptyCount === 0;
    if (complete) {
      let { dispatch } = this.props;
      return (
        <div className="game-status">
          <span>Great Job!!</span>
          <span className="link" onClick={() => dispatch(newGame())}>Play Next Board</span>
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
        {this.getStatusBar()}
        <Board
          data={this.props.board}
          frozen={this.props.frozen}
          highlight={this.props.highlight}
          prevent={this.props.prevent}
          active={this.props.active}
          onActivate={::this.activateHandler}
          onUpdate={::this.updateHandler}
        />
      </div>
    )
  }
}
