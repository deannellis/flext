import * as d3 from 'd3';
import d3Tip from 'd3-tip';

const pieChart = {};

// SETTINGS
const dimensions = {
    height: 300,
    width: 300,
    radius:150
}
const center = {
    x: (dimensions.width / 2 + 5),
    y: (dimensions.height / 2 + 5),
}

const pie = d3.pie()
    .sort(null)
    .value(d => d.amount);
const arcPath = d3.arc()
    .outerRadius(dimensions.radius)
    .innerRadius(dimensions.radius / 2);

// Tweens
const arcEnterTween = d => {
    let i = d3.interpolate(d.endAngle, d.startAngle);
    return function(t) {
        d.startAngle = i(t);
        return arcPath(d);
    }
}

const arcExitTween = d => {
    let i = d3.interpolate(d.startAngle, d.endAngle);
    return function(t) {
        d.startAngle = i(t);
        return arcPath(d);
    }
}

// use function keyword for use of "this"
function arcUpdateTween(d) {
    // console.log(this._current, d);
    let i = d3.interpolate(this._current, d)
    // update the current prop with new updated data
    this._current = i(1);
    return function(t) {
        return arcPath(i(t));
    }
}

// tooltip
const tooltip = d3Tip()
    .attr('class', 'card pie-chart__tooltip')
    .html(d => {
        return `
            <p>${d.data.macro}</p>
            <div>${d.data.amount} grams</div>
        `
    });

const handleMouseOver = (d, i, n) => {
    d3.select(n[i])
        .transition('changeSlice').duration(300)
            .attr('stroke', '#64FF6C')
            .attr('stroke-width', '3px')
            .attr('stroke-linejoin', 'round')
}

const handleMouseOut = (d, i, n) => {
    d3.select(n[i])
        .transition('changeSlice').duration(300)
            .attr('stroke', 'none')
}

pieChart.create = (element, data, config) => {
    const svg = d3.select(element)
        .append('svg')
        .attr('width', dimensions.width + 16)
        .attr('height', dimensions.height + 16);
    const chart = svg.append('g')
        .attr('transform', `translate(${center.x}, ${center.y})`)

    // Gradients
    const defs = svg.append('defs');
    const gradient0 = defs.append("linearGradient")
        .attr('id', 'gradient0')
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
    gradient0.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", "#0cebeb")
        .attr("stop-opacity", 1);
    gradient0.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", "#29ffc6")
        .attr("stop-opacity", 1);

    const gradient1 = defs.append("linearGradient")
        .attr('id', 'gradient1')
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
    gradient1.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        
        .attr("stop-color", "rgb(177, 248, 33)")
        .attr("stop-opacity", 1);
    gradient1.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        
        .attr("stop-color", "rgb(87, 248, 108)")
        .attr("stop-opacity", 1);

    const gradient2 = defs.append("linearGradient")
        .attr('id', 'gradient2')
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");
    gradient2.append("stop")
        .attr('class', 'start')
        .attr("offset", "0%")
        .attr("stop-color", "#11998e")
        .attr("stop-opacity", 1);
    gradient2.append("stop")
        .attr('class', 'end')
        .attr("offset", "100%")
        .attr("stop-color", "#38ef7d")
        .attr("stop-opacity", 1);

    chart.call(tooltip);
    // join data to pie elements
    const paths = chart.selectAll('path')
        .data(pie(data));
    
    paths.attr('d', arcPath)
        .transition().duration(750)
        .attrTween('d', arcUpdateTween);

    paths.enter()
        .append('path')
        .attr('fill', function(d,i) {
            if(d.data.macro === 'leftover') return '#0000003D'
            return `url(#gradient${i})`
        })
        .each(function(d){ this._current = d })
        .transition().duration(750)
            .attrTween('d', arcEnterTween);

    // events
    chart.selectAll('path')
    .on('mouseover', (d,i,n) => {
        if(d.data.macro !== 'leftover') {
            tooltip.show(d, n[i]);
            handleMouseOver(d,i,n);
        }
    })
    .on('mouseout', (d,i,n) => {
        if(d.data.macro !== 'leftover') {
            tooltip.hide();
            handleMouseOut(d,i,n);
        }
    })

    return chart;
};

pieChart.update = (element, data, config, chart) => {
    // join data to pie elements
    const paths = chart.selectAll('path')
        .data(pie(data));
    
    paths.attr('d', arcPath)
        .transition().duration(750)
        .attrTween('d', arcUpdateTween);

    paths.enter()
        .append('path')
        .attr('fill', function(d,i) {
            if(d.data.macro === 'leftover') return '#0000003D'
            return `url(#gradient${i})`
        })
        .each(function(d){ this._current = d })
        .transition().duration(750)
            .attrTween('d', arcEnterTween);
};

pieChart.destroy = (element) => { d3.select(element).remove() };

export default pieChart;