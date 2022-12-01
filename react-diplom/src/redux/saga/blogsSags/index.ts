import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getBlogs, getPagesCount } from '../../../services/blogsServices';
import { IBlogPost, IBlogsResponsePagesCount } from '../../../types/blogsTypes';
import { GET_BLOGS, GET_BLOGS_WITH_FILTER, GET_BLOGS_WITH_PAGE, GET_PAGES_COUNT } from '../../actions/actions';
import { blogsActionCreators } from '../../actions/blogsActionCreators';
import { currentPageBlogsSelector, filterBlogsSelector } from '../../selectors/blogsSelectors';

function* fetchBlogs() {
	try {
		yield put(blogsActionCreators.setBlogsLoading(true));
		const filter: string = yield select(filterBlogsSelector);
		const page: number = yield select(currentPageBlogsSelector);
      
		const response: AxiosResponse<IBlogPost[]> = yield call(getBlogs, { filter, page });
		if (response.data && response.status === 200) {
			yield put(blogsActionCreators.getBlogsSuccess(response.data));
		}
	} catch (e: any) {
		yield put(blogsActionCreators.getBlogsFailure(e?.response?.data?.detail));
	} finally {
      yield put(blogsActionCreators.setBlogsLoading(false)); 
   }
};

function* fetchBlogsWithFilter({ payload }: ReturnType<typeof blogsActionCreators.getBlogsWithFilter>) {
	yield put(blogsActionCreators.setBlogsFilter(payload));
	yield fetchBlogs();   
};

function* fetchBlogsWithPage({ payload }: ReturnType<typeof blogsActionCreators.getBlogsWithPage>) {
	yield put(blogsActionCreators.setBlogsPage(payload));
	yield fetchBlogs();   
};

function* fetchPagesCount() {
	try {
		yield put(blogsActionCreators.setBlogsLoading(true));

		const response: AxiosResponse<IBlogsResponsePagesCount> = yield call(getPagesCount);
		if (response.data && response.status === 200) {
			yield put(blogsActionCreators.getBlogsPagesCountSuccess(response.data));
		}
	} catch (e: any) {
		yield put(blogsActionCreators.getBlogsFailure(e?.response?.data?.detail));
	} finally {
      yield put(blogsActionCreators.setBlogsLoading(false)); 
	}
}

export function* watchBlogsSaga() {
	yield all([
		takeLatest(GET_BLOGS, fetchBlogs),
		takeLatest(GET_BLOGS_WITH_FILTER, fetchBlogsWithFilter),
		takeLatest(GET_PAGES_COUNT, fetchPagesCount),
		takeLatest(GET_BLOGS_WITH_PAGE, fetchBlogsWithPage)
	])
}