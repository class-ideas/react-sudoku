import React, { Component, PropTypes } from 'react';
import Cell from './cell';

export default class Board extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    frozen: PropTypes.arrayOf(PropTypes.number).isRequired,
    highlight: PropTypes.arrayOf(PropTypes.number).isRequired,
    prevent: PropTypes.arrayOf(PropTypes.string).isRequired,
    active: PropTypes.number,
    duplicate: PropTypes.string,
    onActivate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired
  }

  getCell(val, idx) {
    let { frozen, highlight, prevent, active, duplicate, onActivate, onUpdate, onDuplicate } = this.props;
    return (
      <Cell
        key={idx}
        frozen={frozen.includes(idx)}
        highlighted={highlight.includes(idx)}
        prevent={prevent}
        index={idx}
        value={val}
        duplicate={duplicate === val && highlight.includes(idx)}
        active={active === idx}
        onActivate={onActivate}
        onUpdate={onUpdate}
        onDuplicate={onDuplicate}
      />
    )
  }

  render() {
    let { data } = this.props;
    return (
      <div className="board">
        {data.map(::this.getCell)}
      </div>
    )
  }
}
