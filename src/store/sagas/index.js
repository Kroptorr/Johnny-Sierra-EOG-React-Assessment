import ApiErrors from "./ApiErrors";
import DroneSaga from "./DroneData";
import WeatherSagas from "./Weather";

export default [...ApiErrors, ...WeatherSagas, ...DroneSaga];
