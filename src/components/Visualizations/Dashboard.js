import Avatar from "@material-ui/core/Avatar/Avatar";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import React, {Component} from "react";

class Dashboard extends Component {
	render () {
		
		const {
			fetching,
			classes,
			lastThree
		} = this.props;
		
		return (
			<Card>
				<CardHeader title="Last 3 Drone Locations"/>
				{fetching && !lastThree
					? <CircularProgress className={classes.progress} color="secondary"/>
					: <CardContent>
						<div style={{display: "flex", justifyContent: "center"}}>
							<List>
								{lastThree.map((c, i) =>
									<ListItem key={i}>
										<Avatar>{i + 1}</Avatar>
										<ListItemText
											primary={
												`Latitude: ${c.latitude.toFixed(2)},
												Longitude: ${c.longitude.toFixed(2)},
												Temp: ${c.metric.toFixed(2)}`}
											secondary={
												`Timestamp: ${new Date(c.timestamp).toLocaleString()},
												Accuracy: ${c.accuracy.toFixed(2)}`}
										/>
									</ListItem>
								)}
							</List>
						</div>
					</CardContent>
				}
			</Card>
		);
	}
}

export default Dashboard;