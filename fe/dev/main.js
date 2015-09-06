var STROKE_WIDTH = 2;


var App = {};

App.CurrentUser = Backbone.Model.extend({
    url: 'data.json'
});

App.CurrentUserView = Backbone.View.extend({
    el: '#main',

    initialize: function(){
        this.model.on('change', this.render.bind(this));
        this.model.fetch();
    },

    render: function(){
        this.$el.html( '<h1 class="page-title">' + this.model.get('title') + '</h1>' );

        var links = this.model.get('links');
        var nodes = this.model.get('nodes');

        var width = 960,
            height = 500;

        var svg = d3
            .select('#main')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        var links = svg
            .selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('stroke-width', function(d){ return d.weight * STROKE_WIDTH })
            .attr('x1', function(d){ return getCoordinatesOfNode(d.a).x; })
            .attr('y1', function(d){ return getCoordinatesOfNode(d.a).y; })
            .attr('x2', function(d){ return getCoordinatesOfNode(d.o).x; })
            .attr('y2', function(d){ return getCoordinatesOfNode(d.o).y; });

        function getCoordinatesOfNode(nodeId){
            var found = nodes.filter(function(node){
                return node.id === nodeId;
            });

            if (!found.length){
                throw Error('Node with id `' + nodeid + '` wasn\'t found')
            }
            
            return found[0];
        }
        var node = svg
            .selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')';  });

        node.append('text')
            .text(function(d){ return d.title; })
            .attr('class', 'title')
            .attr('dx', 40);

        node.append('text')
            .text(function(d){ return d.years; })
            .attr('class', 'years')
            .attr('dx', 40)
            .attr('dy', '1.1em');

        node.append("foreignObject")
            .attr('x', 40)
            .attr('y', '1em')
            .attr("width", 480)
            .attr("height", 500)
            .append("xhtml:div")
            .attr('class', 'desc')
            .html(function(d){ return d.desc; });

        node.append('image')
            .attr('xlink:href', function(d){ return d.imgUrl; })
            .attr('x', -32)
            .attr('y', -32)
            .attr('width', 64)
            .attr('height', 64);


    }
});

new App.CurrentUserView({ model: new App.CurrentUser() });

