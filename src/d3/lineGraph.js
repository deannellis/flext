import * as d3 from 'd3';

const lineGraph = {};

// SETTINGS
const margin = { top: 40, right: 20, bottom: 50, left: 50 };
const graphWidth = 560 - margin.left - margin.right;
const graphHeight = 400 - margin.top - margin.bottom;
const transitionDuration = 200;
const lineColor = '#00F260';
const secondaryColor = '#ccc';
const hoverColor = '#fff';

// SCALES
const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);

// D3 LINE PATH GENERATOR
const line = d3.line()
.x(function(d){ return x(new Date(d.date)) })
.y(function(d){ return y(d.weight) });

// AXES
const xAxis = d3.axisBottom(x)
    .ticks(4)
    .tickFormat(d3.timeFormat('%b %d'));

const yAxis = d3.axisLeft(y)
    .ticks(4)
    .tickFormat(d => d + 'lbs');

lineGraph.create = (element, data, config) => {
    // GRAPH
    const svg = d3.select(element)
        .append('svg')
        .attr('width', graphWidth + margin.left + margin.right)
        .attr('height', graphHeight + margin.top + margin.bottom);

    const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // AXES GROUPS
    const xAxisGroup = graph.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${graphHeight})`);

    const yAxisGroup = graph.append('g')
        .attr('class', 'y-axis');

    const path = graph.append('path')
        .attr('class', 'main-line');

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
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // rotate axis text
    xAxisGroup.selectAll('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-40)');

    return graph;
};

lineGraph.update = (element, data, config, graph) => {

    // update scale domains
    x.domain(d3.extent(data, d => new Date(d.date)));
    y.domain([0, d3.max(data, d => d.weight)])

    const path = graph.select('.main-line');

    // update path data
    path.data([data])
        .transition().duration(750)
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('stroke-width', 2)
        .attr('d', line)

    const circles = graph.selectAll('circle')
        .data(data)
    
    // remove exited points
    circles.exit().remove();

    // update current points
    circles.transition().duration(750)
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d.weight))

    // add new points
    circles.enter()
        .append('circle')
        .attr('r', 4)
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d.weight))
        .transition().duration(750)
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
        // AXES GROUPS
        const xAxisGroup = graph.select('.x-axis')
        const yAxisGroup = graph.select('.y-axis');
        // update axis
        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);
        // rotate axis text
        xAxisGroup.selectAll('text')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-40)');
};

lineGraph.destroy = (element) => { d3.select(element).remove() };

export default lineGraph;