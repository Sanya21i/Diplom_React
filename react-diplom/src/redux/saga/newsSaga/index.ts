import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getIndividNew, getNews, getNewsPagesCount } from '../../../services/newsServices';
import { INewsPost, INewsResponsePagesCount } from '../../../types/newsTypes';
import { GET_INDIVID_NEW, GET_NEWS, GET_NEWS_PAGES_COUNT, GET_NEWS_WITH_FILTER, GET_NEWS_WITH_PAGE, GET_NEWS_WITH_SORT } from '../../actions/actions';
import { newsActionCreators } from '../../actions/newsActionCreators';
import { currentPageNewsSelector, filterNewsSelector, sortNewsSelector } from '../../selectors/newsSelectors';

function* fetchNews() {
	try {
		yield put(newsActionCreators.setNewsLoading(true));
		const filter: string = yield select(filterNewsSelector);
		const page: number = yield select(currentPageNewsSelector);
		const sort: string = yield select(sortNewsSelector);

		const response: AxiosResponse<INewsPost[]> = yield call(getNews, { filter, page, sort });
		if (response.data && response.status === 200) {
			yield put(newsActionCreators.getNewsSuccess(response.data));
		}
	} catch (e: any) {
		yield put(newsActionCreators.getNewsFailure(e?.response?.data?.detail));
	} finally {
      yield put(newsActionCreators.setNewsLoading(false)); 
   }
};

function* fetchNewsWithFilter({ payload }: ReturnType<typeof newsActionCreators.getNewsWithFilter>) {
	yield put(newsActionCreators.setNewsFilter(payload));
	yield fetchNews();   
};

function* fetchNewsWithPage({ payload }: ReturnType<typeof newsActionCreators.getNewsWithPage>) {
	yield put(newsActionCreators.setNewsPage(payload));
	yield fetchNews();   
};

function* fetchBlogsWithSort({ payload }: ReturnType<typeof newsActionCreators.getNewsWithSort>) {
	yield put(newsActionCreators.setNewsSort(payload));
	yield fetchNews();   
};

function* fetchNewsPagesCount() {
	try {
		yield put(newsActionCreators.setNewsLoading(true));

		const response: AxiosResponse<INewsResponsePagesCount> = yield call(getNewsPagesCount);
		if (response.data && response.status === 200) {
			yield put(newsActionCreators.getNewsPagesCountSuccess(response.data));
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
		takeLatest(GET_INDIVID_NEW, fetchIndividNew),
		takeLatest(GET_NEWS_WITH_FILTER, fetchNewsWithFilter),
		takeLatest(GET_NEWS_WITH_PAGE, fetchNewsWithPage),
		takeLatest(GET_NEWS_WITH_SORT, fetchBlogsWithSort),
		takeLatest(GET_NEWS_PAGES_COUNT, fetchNewsPagesCount)
	])
};