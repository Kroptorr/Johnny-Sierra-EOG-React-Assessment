import React, {Component} from "react";
import Plot from "react-plotly.js";

class PlotGraph extends Component {
	render () {
		const {allTemps, allTimestamps} = this.props;
		return (
			
			<div style={{display: "flex", justifyContent: "center"}}>
				<Plot
					data={[
						{
							x: allTimestamps,
							y: allTemps,
							type: "scatter",
							marker: {color: "red"}
						}
					]}
					layout={{autosize: true, title: "A Fancy Plot"}}
					style={{width: "100%", height: "100%"}}
				/>
			</div>
		);
	}
}

export default PlotGraph;