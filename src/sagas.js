import { call, put, takeLatest } from 'redux-saga/effects';
import * as utils from './utils';
import * as gameActions from 'actions/game-actions';

function* initializeApp() {
  yield call(utils.fetchVariantsIds);
  yield put(gameActions.loadVariant());
}

function* loadVariant() {
  const id = utils.getFreeId();
  const variant = yield call(utils.fetchVariant, id);
  yield put(gameActions.setVariant(variant));
}

export default function* rootSaga() {
  yield takeLatest(gameActions.INITIALIZE_APP, initializeApp);
  yield takeLatest(gameActions.LOAD_VARIANT, loadVariant);
}
