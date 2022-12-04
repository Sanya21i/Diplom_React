import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getIndividNew, getNews } from '../../../services/newsServices';
import { INewsPost } from '../../../types/newsTypes';
import { GET_INDIVID_NEW, GET_NEWS } from '../../actions/actions';
import { newsActionCreators } from '../../actions/newsActionCreators';


function* fetchNews() {
	try {
		yield put(newsActionCreators.setNewsLoading(true));

		const response: AxiosResponse<INewsPost[]> = yield call(getNews);
		if (response.data && response.status === 200) {
			yield put(newsActionCreators.getNewsSuccess(response.data));
		}
	} catch (e: any) {
		yield put(newsActionCreators.getNewsFailure(e?.response?.data?.detail));
	} finally {
      yield put(newsActionCreators.setNewsLoading(false)); 
   }
};

function* fetchIndividNew({ payload }: ReturnType<typeof newsActionCreators.getIndividNew>) {
	try {
		yield put(newsActionCreators.setNewsLoading(true));

		const response: AxiosResponse<INewsPost> = yield call(getIndividNew, payload);
		if (response.data && response.status === 200) {
			yield put(newsActionCreators.getIndividNewSuccess(response.data));
		}
	} catch (e: any) {
		yield put(newsActionCreators.getNewsFailure(e?.response?.data?.detail));
	} finally {
		yield put(newsActionCreators.setNewsLoading(false));
	}
};

export function* watchNewsSaga() {
	yield all([
		takeLatest(GET_NEWS, fetchNews),
		takeLatest(GET_INDIVID_NEW, fetchIndividNew)
	])
};