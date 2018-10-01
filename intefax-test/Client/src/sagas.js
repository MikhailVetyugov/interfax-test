import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as utils from './utils';
import * as gameActions from 'actions/game-actions';

function* initializeApp() {
  yield takeLatest(gameActions.INITIALIZE_APP, loadAll);
}

function* loadVariant() {
  yield takeLatest(gameActions.LOAD_VARIANT, loadNewVariant);
}

function* loadAll() {
  yield call(utils.fetchVariantsIds);
  yield put(gameActions.loadVariant());
}

function* loadNewVariant() {
  const id = utils.getFreeId();
  const variant = yield call(utils.fetchVariant, id);
  yield put(gameActions.setVariant(variant));
}

export default function* rootSaga() {
  yield all([
    initializeApp(),
    loadVariant()
  ]);
}
