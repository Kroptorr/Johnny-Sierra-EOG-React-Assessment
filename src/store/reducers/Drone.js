import * as actions from "../actions";

const initialState = {
	fetching: false,
	data: [],
	error: null
};

const fetchDroneData = (state) => {
	return {...state, fetching: true};
};

const droneDataReceived = (state, action) => {
	return {...state, data: action.data, fetching: false};
};

const handlers = {
	[actions.DRONE_DATA_RECEIVED]: droneDataReceived,
	[actions.FETCH_DRONE_DATA]: fetchDroneData
};

export default (state = initialState, action) => {
	const handler = handlers[action.type];
	if (!handler) return state;
	return handler(state, action);
};