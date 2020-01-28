import React, { Component } from 'react';
import * as d3 from 'd3';

class LineGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.draw(this.props)
    }

    componentDidUpdate() {
        d3.select('svg').remove();
        this.draw(this.props)
    }

    render() { return (<div className="lineGraph" ref="lineGraph"></div>) }
    
    draw(props) {
        // SETTINGS
        const margin = { top: 40, right: 20, bottom: 50, left: 50 };
        const graphWidth = 560 - margin.left - margin.right;
        const graphHeight = 400 - margin.top - margin.bottom;
        const transitionDuration = 200;
        const lineColor = '#64FF6C';
        const secondaryColor = '#ccc';
        const hoverColor = '#fff';

        // GRAPH
        
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

        // DOTTED REFERENCE LINES
        const dottedLines = graph.append('g')
            .style('opacity', 0);

        const xDottedLine = dottedLines.append('line')
            .attr('stroke', secondaryColor)
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', 4);

        const yDottedLine = dottedLines.append('line')
            .attr('stroke', secondaryColor)
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', 4);

        // START DRAWING
        const { data } = props;
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // set scale domains
        x.domain(d3.extent(data, d => new Date(d.date)));
        y.domain([0, d3.max(data, d => d.weight)])

        // update path data
        path.data([data])
            .attr('fill', 'none')
            .attr('stroke', lineColor)
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
                .attr('fill', secondaryColor)

        // show dotted reference lines on hover
        graph.selectAll('circle')
            .on('mouseover', (d,i,n) => {
                console.log('hovered!!!')
                d3.select(n[i])
                    .transition().duration(transitionDuration)
                    .attr('r', 8)
                    .attr('fill', hoverColor)

                xDottedLine
                    .attr('x1', x(new Date(d.date)))
                    .attr('x2', x(new Date(d.date)))
                    .attr('y1', graphHeight)
                    .attr('y2', y(d.weight));
                
                yDottedLine
                    .attr('x1', 0)
                    .attr('x2', x(new Date(d.date)))
                    .attr('y1', y(d.weight))
                    .attr('y2', y(d.weight));

                dottedLines
                    .transition().duration(transitionDuration)
                        .style('opacity', 1);
            })
            .on('mouseleave', (d,i,n) => {
                d3.select(n[i])
                    .transition().duration(transitionDuration)
                        .attr('r', 4)
                        .attr('fill', secondaryColor);
                dottedLines
                    .transition().duration(transitionDuration)
                        .style('opacity', 0);
            })

        // create axis
        const xAxis = d3.axisBottom(x)
            .ticks(4)
            .tickFormat(d3.timeFormat('%b %d'));

        const yAxis = d3.axisLeft(y)
            .ticks(4)
            .tickFormat(d => d + 'lbs');
        
        // create axis
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        // rotate axis text
        xAxisGroup.selectAll('text')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-40)');
    }
}
 
export default LineGraph;