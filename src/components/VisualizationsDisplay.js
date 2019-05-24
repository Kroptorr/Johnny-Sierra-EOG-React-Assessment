import AppBar from "@material-ui/core/AppBar/AppBar";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import React, {Component, Fragment} from "react";

import {connect} from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import * as actions from "../store/actions";

import Dashboard from "./Visualizations/Dashboard";
import GoogleMaps from "./Visualizations/GoogleMaps";
import PlotGraph from "./Visualizations/PlotGraph";

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500
	}
});

class Drone extends Component {
	state = {
		activeTab: 0
	};
	
	changeTab = (e, n) => {
		this.setState({activeTab: n});
	};
	
	componentDidMount () {
		const {onLoad} = this.props;
		onLoad();
		this.timer = setInterval(() => onLoad(), 4000);
		
	}
	
	componentWillUnmount () {
		clearInterval(this.timer);
	}
	
	render () {
		
		const {activeTab} = this.state;
		return (
			<Fragment>
				<AppBar position="static">
					<Tabs value={this.state.activeTab} onChange={this.changeTab}>
						<Tab label="Map Visualization"/>
						<Tab label="Graph Visualization"/>
						<Tab label="Dashboard Visualization"/>
					</Tabs>
				</AppBar>
				{activeTab === 0 && <GoogleMaps
					isMarkerShown
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUb28OdBIsfKjVcQHFRDRv1CMgcqWR2rY&v=3.exp&libraries=geometry,drawing,places"
					loadingElement={<div style={{height: `100%`}}/>}
					containerElement={<div style={{height: `500px`}}/>}
					mapElement={<div style={{height: `100%`}}/>}
					{...this.props}
				/>}
				{activeTab === 1 && <PlotGraph {...this.props}/>}
				{activeTab === 2 && <Dashboard {...this.props}/>}
			</Fragment>
		);
	}
}

const mapState = (state) => {
	const {
		data,
		fetching,
		lastLatitude,
		lastLongitude,
		allTemps,
		allTimestamps,
		lastThree
		
	} = state.drone;
	return {
		data,
		fetching,
		lastLatitude,
		lastLongitude,
		allTemps,
		allTimestamps,
		lastThree
	};
};

const mapDispatch = dispatch => ({
	onLoad: () =>
		dispatch({
			type: actions.FETCH_DRONE_DATA
		})
});
const DroneVisual = withStyles(styles)(Drone);
export default connect(
	mapState,
	mapDispatch
)(DroneVisual);