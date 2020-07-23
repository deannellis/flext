import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lineGraph from '../d3/lineGraph';

class LineGraph extends Component {
	componentDidMount() {
		const { data } = this.props;
		this._chart = lineGraph.create(this._rootNode, data);
	}

	componentDidUpdate() {
		const { data } = this.props;
		lineGraph.update(this._rootNode, data, this._chart);
	}

	componentWillUnmount() {
		lineGraph.destroy(this._rootNode);
	}

	_setRef(componentNode) {
		this._rootNode = componentNode;
	}

	render() {
		return <div className="line-graph" ref={this._setRef.bind(this)} />;
	}
}
LineGraph.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};
LineGraph.defaultProps = {
	data: [],
};

export default LineGraph;
