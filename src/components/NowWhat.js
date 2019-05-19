import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core/styles";
import React from "react";
import DroneVisual from "./DroneVisualization";

const styles = {
	card: {
		margin: "5% 25%"
	}
};

const NowWhat = props => {
	const {classes} = props;
	return (
		<Card className={classes.card}>
			<DroneVisual/>
		</Card>
	);
};

export default withStyles(styles)(NowWhat);
