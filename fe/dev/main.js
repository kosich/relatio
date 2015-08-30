console.log('FUCK YEAH!!!');

var data = {
    nodes: [
        {
            id: 0,
            x: 100,
            y: 300,
            title: 'duos titildo'
        },
        {
            id: 1,
            x: 200,
            y: 100,
            title: 'un title'
        }
    ],
    links: [
        { x1: 100, y1: 300, x2: 200, y2: 100 }
    ]
};

var width = 960,
    height = 500;

var svg = d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var links = svg
    .selectAll(".link")
    .data(data.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr('x1', function(d){ return d.x1; })
    .attr('y1', function(d){ return d.y1; })
    .attr('x2', function(d){ return d.x2; })
    .attr('y2', function(d){ return d.y2; });

var node = svg
    .selectAll('.node')
    .data(data.nodes)
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

