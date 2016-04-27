import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Intro extends Component {
  render() {
    return (
      <div>
        <Link to="play">start game</Link>
      </div>
    )
  }
}
