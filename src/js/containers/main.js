import React, { Component } from 'react';

export default class MainContainer extends Component {
  render() {
    return (
      <div>
        <h1>Sudoku</h1>
        {this.props.children}
      </div>
    )
  }
}
