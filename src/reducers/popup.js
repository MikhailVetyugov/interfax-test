import * as actions from 'actions/popup-actions';

const initialState = { opened: false }

export default function popup(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_POPUP:
      return {...state, ...{ opened: action.opened}};
    default:
      return state;
  }
}