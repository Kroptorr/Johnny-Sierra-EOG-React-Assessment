import Avatar from "@material-ui/core/Avatar/Avatar";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import withStyles from "@material-ui/core/es/styles/withStyles";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import React, {Component, Fragment} from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {connect} from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import * as actions from "../store/actions";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
	<GoogleMap
		defaultZoom={4}
		defaultCenter={{lat: 29.7604, lng: -95.3698}}
	>
		{props.data ?
			props.isMarkerShown && props.data[props.data.length - 1] &&
			<Marker position={{lat: props.data[props.data.length - 1].latitude, lng: props.data[props.data.length - 1].longitude}}/>
			: null}
	</GoogleMap>
));

const styles = {
	progress: {
		margin: "100px 0 100px 50%",
		transform: "translateX(-20px)"
	}
};

class Drone extends Component {
	
	componentDidMount () {
		const {onLoad} = this.props;
		onLoad();
		this.timer = setInterval(() => onLoad(), 4100);
		
	}
	
	componentWillUnmount () {
		clearInterval(this.timer);
	}
	
	render () {
		const {data, fetching, classes} = this.props;
		return (
			<Fragment>
				<MyMapComponent
					isMarkerShown
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUb28OdBIsfKjVcQHFRDRv1CMgcqWR2rY&v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{height: `100%`}}/>}
					containerElement={<div style={{height: `400px`}}/>}
					mapElement={<div style={{height: `100%`}}/>}
					data={data}
				/>
				<Card>
					<CardHeader title="Last 3 Drone Locations"/>
					{fetching && <CircularProgress className={classes.progress} color="secondary"/>}
					{!fetching && <CardContent>
						<List>
							
							{data !== undefined && data.slice(data.length - 4, data.length - 1).reverse().map((item, index) =>
								<ListItem key={index}>
									<Avatar>{index + 1}</Avatar>
									<ListItemText
										primary={`Latitude: ${item.latitude.toFixed(2)}, Longitude: ${item.longitude.toFixed(2)}`}
										secondary={`Timestamp: ${new Date(item.timestamp).toLocaleString()}, Accuracy: ${item.accuracy.toFixed(2)}`}
									/>
								</ListItem>)}
						</List>
					</CardContent>}
				</Card>
			</Fragment>
		
		);
	}
}

const DroneVisual = withStyles(styles)(Drone);

const mapState = (state) => {
	const {
		data,
		fetching
	} = state.drone;
	return {
		data,
		fetching
	};
};

const mapDispatch = dispatch => ({
	onLoad: () =>
		dispatch({
			type: actions.FETCH_DRONE_DATA
		})
});

export default connect(
	mapState,
	mapDispatch
)(DroneVisual);