import {all, call, put, takeEvery} from "redux-saga/effects";
import * as actions from "../actions";
import api from "../api";

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga () {
	try {
 	const {data} = yield call(
 		
 		api.getDroneData
	);
		yield put({type: actions.DRONE_DATA_RECEIVED, data: data})
	} catch (error) {
		
		console.log({error});
		yield put({type: "API_CALL_FAILURE", error});
	}
 
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga () {
	yield all([
		takeEvery(actions.FETCH_DRONE_DATA, workerSaga)
	]);
}

export default [watcherSaga];