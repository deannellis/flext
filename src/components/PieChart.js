import React, { Component } from 'react';
import PropTypes from 'prop-types';

import pieChart from '../d3/pieChart';

class PieChart extends Component {
	constructor() {
		super();
		this.state = {
			isCreating: false,
		};
	}

	async componentDidMount() {
		const { data } = this.props;
		this.setState({ isCreating: true });
		this._chart = await pieChart.create(this._rootNode, data);
		this.setState({ isCreating: false });
	}

	componentDidUpdate(prevProps) {
		const { data } = this.props;
		const { isCreating } = this.state;

		prevProps.data.forEach((item) => {
			const currProp = data.filter((prop) => prop.macro === item.macro)[0];
			if (item.amount !== currProp.amount) {
				if (!isCreating) {
					pieChart.update(this._rootNode, data, this._chart);
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
		return <div className="pie-chart" ref={this._setRef.bind(this)} />;
	}
}
PieChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};
PieChart.defaultProps = {
	data: [],
};

export default PieChart;
