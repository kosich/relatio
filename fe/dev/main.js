console.log('FUCK YEAH!!!');

var data = [
    {
        name: 'hellow',
        r: 50,
        x: 200,
        y: 100,
        color: 1
    }
];

var width = 960,
    height = 500;

var color = d3.scale.category20();

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var node = svg
    .selectAll('.node')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('cx', function(d){ return d.x; })
    .attr('cy', function(d){ return d.y; })
    .attr('r', function(d){ return d.r; })
    .style('fill', function(d) { return color(d.color); });

node.append('title')
    .text(function(d) { return d.name; });
