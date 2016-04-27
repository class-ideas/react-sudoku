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
export default class Games extends Component {
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

  render() {
    return (
      <div>
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
