import { createStore, compose, applyMiddleware, PreloadedState } from 'redux';
import rootReducer from '../reducer';
import createSagasMiddleware from 'redux-saga';
import { rootSaga } from '../saga';

const sagaMiddleware = createSagasMiddleware();

const composeEnhancers =
	process.env.NODE_ENV !== 'production' &&
	typeof window === 'object' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const configureStore = (preloadedState: PreloadedState<{}>) =>
	createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

const store = configureStore({});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionType<T extends { [key:string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;

export default store;