import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Games extends Component {
  render() {
    return (
      <div>
        <Link to="play">start game</Link>
      </div>
    )
  }
}
