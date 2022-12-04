import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchBlogsSaga } from './blogsSags';
import { watchNewsSaga } from './newsSaga';

export function* rootSaga() {
   yield all([fork(watchAuthSaga), fork(watchBlogsSaga), fork(watchNewsSaga)])
};