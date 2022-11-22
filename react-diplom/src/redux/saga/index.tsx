import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';

export function* rootSaga() {
   yield all([fork(watchAuthSaga)])
};