console.log('FUCK YEAH!!!');

var data = [
    {
        x: 200,
        y: 100,
        title: 'un title'
    }
];

var width = 960,
    height = 500;

var svg = d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var node = svg
    .selectAll('.node')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";  });

node.append('text')
    .text(function(d){ return d.title; })
    .attr('class', 'title')
    .attr('dx', 11)
    .attr('dy', '.35em');

node.append('image')
    .attr('xlink:href', 'https://github.com/favicon.ico')
    .attr('x', -8)
    .attr('y', -8)
    .attr('width', 16)
    .attr('height', 16);

