// Javascript Entry Point

import React from 'react';
import { render } from 'react-dom';

import Game from './components/game';

render((
  <Game/>
), document.querySelector('.app'))
