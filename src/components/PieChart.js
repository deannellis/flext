import React, { Component } from 'react';

import pieChart from '../d3/pieChart';

class PieChart extends Component {

    componentDidMount() {
        this._chart = pieChart.create(
            this._rootNode,
            this.props.data,
            this.props.config,
        );
    }

    componentDidUpdate() {
        pieChart.update(
            this._rootNode,
            this.props.data,
            this.props.config,
            this._chart
        );
    }

    componentWillUnmount() {
        pieChart.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() { 
        return (
            <div className="pie-chart" ref={this._setRef.bind(this)}></div>
        );
    }
}
 
export default PieChart;