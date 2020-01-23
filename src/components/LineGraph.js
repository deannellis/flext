import React, { Component } from 'react';
import * as d3 from 'd3';
// import update from '../d3/lineGraph';

class LineGraph extends Component {

    update(props) {
        const margin = { top: 40, right: 20, bottom: 50, left: 100 };
        const graphWidth = 560 - margin.left - margin.right;
        const graphHeight = 400 - margin.top - margin.bottom;

        const svg = d3.select(this.refs.lineGraph)
            .append('svg')
            .attr('width', graphWidth + margin.left + margin.right)
            .attr('height', graphHeight + margin.top + margin.bottom);

        const graph = svg.append('g')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // SCALES
        const x = d3.scaleTime().range([0, graphWidth]);
        const y = d3.scaleLinear().range([graphHeight, 0]);

        // AXES GROUPS
        const xAxisGroup = graph.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${graphHeight})`);

        const yAxisGroup = graph.append('g')
            .attr('class', 'y-axis');

        // D3 LINE PATH GENERATOR
        const line = d3.line()
            .x(function(d){ return x(new Date(d.date)) })
            .y(function(d){ return y(d.weight) });

        const path = graph.append('path');
        const { data } = props;
        
        // set scale domains
        x.domain(d3.extent(data, d => new Date(d.date)));
        y.domain([0, d3.max(data, d => d.weight)])

        // const date = data[0].date
        // console.log('lgd', new Date (date));

        // update path data
        path.data([data])
            .attr('fill', 'none')
            .attr('stroke', '#64FF6C')
            .attr('stroke-width', 2)
            .attr('d', line);

        const circles = graph.selectAll('circle')
            .data(data)
        
        // remove exited points
        circles.exit().remove();

        // update current points
        circles.attr('cx', d => x(new Date(d.date)))
            .attr('cy', d => y(d.weight))

        // add new points
        circles.enter()
            .append('circle')
                .attr('r', 4)
                .attr('cx', d => x(new Date(d.date)))
                .attr('cy', d => y(d.weight))
                .attr('fill', '#ccc')

        // create axis
        const xAxis = d3.axisBottom(x)
            .ticks(4);
            // .tickFormat(d => d+ '')

        const yAxis = d3.axisLeft(y)
            .ticks(4)
        
        // create axis
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        // rotate axis text
        xAxisGroup.selectAll('text')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-40)');
    }

    componentDidMount() {
        this.update(this.props, this.refs.lineGraph)
    }

    componentDidUpdate() {
        this.update(this.props, this.refs.lineGraph)
    }

    render() { 
        return (<div className="lineGraph" ref="lineGraph"></div>);
    }
}
 
export default LineGraph;