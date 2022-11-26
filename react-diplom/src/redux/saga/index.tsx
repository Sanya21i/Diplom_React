import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchBlogsSaga } from './blogsSags';

export function* rootSaga() {
   yield all([fork(watchAuthSaga), fork(watchBlogsSaga)])
};