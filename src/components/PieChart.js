import React, { Component } from "react";

import pieChart from "../d3/pieChart";

class PieChart extends Component {
	constructor() {
		super();
		this.state = {
			isCreating: false
		};
	}
	async componentDidMount() {
		console.log("Pie Graph Data: ", this.props.data);
		this.setState({ isCreating: true });
		this._chart = await pieChart.create(
			this._rootNode,
			this.props.data,
			this.props.config
		);
		this.setState({ isCreating: false });
	}

	componentDidUpdate(prevProps) {
		for (const prop in prevProps) {
		}
		prevProps.data.forEach(item => {
			const currProp = this.props.data.filter(
				prop => prop.macro == item.macro
			)[0];
			if (item.amount !== currProp.amount) {
				if (!this.state.isCreating) {
					return pieChart.update(
						this._rootNode,
						this.props.data,
						this.props.config,
						this._chart
					);
				}
			}
		});
	}

	componentWillUnmount() {
		pieChart.destroy(this._rootNode);
	}

	_setRef(componentNode) {
		this._rootNode = componentNode;
	}

	render() {
		return <div className="pie-chart" ref={this._setRef.bind(this)}></div>;
	}
}

export default PieChart;

