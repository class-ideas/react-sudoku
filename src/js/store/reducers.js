import { NEW_GAME, ACTIVATE_CELL, UPDATE_CELL } from './actions';

const defaultState = {
  board: [],
  frozen: [],
  highlight: [],
  prevent: []
}

export default function rootReducer(state=defaultState, action) {

  switch(action.type) {

    case NEW_GAME:
      return Object.assign({}, state, {
        board: action.board,
        frozen: action.frozen
      });
    break;

    case ACTIVATE_CELL:
      return Object.assign({}, state, {
        activeCellIndex: action.cellIndex,
        highlight: action.highlight,
        prevent: action.prevent
      });
    break;

    case UPDATE_CELL:
      let board = [...state.board];
      board[action.cellIndex] = action.value;
      return Object.assign({}, state, {
        board,
        activeCellIndex: null ,
        prevent: [],
        highlight: []
      });
    break;

    default:
      return state;
    break;
  }

}
