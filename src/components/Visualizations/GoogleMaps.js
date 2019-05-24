import React, {Component} from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";

class GoogleMaps extends Component {
	render () {
		const {lastLongitude, lastLatitude, fetching} = this.props;
		return (
			<GoogleMap
				defaultZoom={4}
				defaultCenter={{lat: 29.7604, lng: -95.3698}}
			>
				{!fetching || lastLongitude ? <Marker position={{lat: lastLatitude, lng: lastLongitude}}/> : null}
			</GoogleMap>
		);
	}
}

export default withScriptjs(withGoogleMap(GoogleMaps));