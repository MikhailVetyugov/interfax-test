import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import gameReducer from 'reducers/game';
import popupReducer from 'reducers/popup';
import rootSaga from './sagas';
import App from 'components/App';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  gameReducer,
  popupReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('sudoku-app'));