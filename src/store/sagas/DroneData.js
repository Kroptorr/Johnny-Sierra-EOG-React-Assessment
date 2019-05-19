import {all, call, cancel, put, takeEvery} from "redux-saga/effects";
import * as actions from "../actions";
import api from "../api";

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga () {
	
	const {error, data} = yield call(
 		api.getDroneData
	);
	if (error) {
		yield put({type: actions.API_ERROR, code: error.code});
		yield cancel();
		return;
	}
	if (!data) {
		yield put({type: actions.API_ERROR});
		yield cancel();
		return;
	}
	yield put({type: actions.DRONE_DATA_RECEIVED, data: data});
 
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga () {
	yield all([
		takeEvery(actions.FETCH_DRONE_DATA, workerSaga)
	]);
}

export default [watcherSaga];