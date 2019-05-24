import * as actions from "../actions";

const initialState = {
	fetching: false,
	data: [],
	error: null,
	lastLongitude: null,
	lastLatitude: null,
	allTemps: [],
	allTimestamps: []
};

const fetchDroneData = (state) => {
	return {...state, fetching: true};
};

const droneDataReceived = (state, action) => {
	const data = action.data;
	const {longitude, latitude} = data[data.length - 1];
	const lastThree = data.slice(data.length - 4, data.length - 1).reverse();
	return {
		...state,
		data,
		fetching: false,
		lastLongitude: longitude,
		lastLatitude: latitude,
		allTemps: data.map(c => c.metric),
		allTimestamps: data.map(c => new Date(c.timestamp)),
		lastThree
	};
	
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