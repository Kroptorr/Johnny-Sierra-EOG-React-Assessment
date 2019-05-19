import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import droneReducer from "./reducers/Drone";
import weatherReducer from "./reducers/Weather";
import sagas from "./sagas";

export default () => {
	const rootReducer = combineReducers({
		weather: weatherReducer,
		drone: droneReducer
	});
	
	const composeEnhancers = composeWithDevTools({});
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = applyMiddleware(sagaMiddleware);
	const store = createStore(rootReducer, composeEnhancers(middlewares));
	
	sagas.forEach(sagaMiddleware.run);
	
	return store;
};
