import React, { Component } from 'react';
import lineGraph from '../d3/lineGraph';

class LineGraph extends Component {

    componentDidMount() {
        this._chart = lineGraph.create(
            this._rootNode,
            this.props.data,
            this.props.config,
        );
    }

    componentDidUpdate() {
        lineGraph.update(
            this._rootNode,
            this.props.data,
            this.props.config,
            this._chart
        );
    }

    componentWillUnmount() {
        lineGraph.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() { 
        return (
            <div className="line-graph" ref={this._setRef.bind(this)}></div>
        );
    }
}

LineGraph.defaultProps = {
    data: [],
    
}
 
export default LineGraph;