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
        // RENDER PAGE TITLE
        this.$el.html( '<h1 class="page-title">' + this.model.get('title') + '</h1>' );

        // RENDER DATA

        // create the zoom listener
        var zoomListener = d3.behavior.zoom()
            .scaleExtent([0.1, 3])
            .on("zoom", zoomHandler);

        // function for handling zoom event
        function zoomHandler() {
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        var links = this.model.get('links');
        var nodes = this.model.get('nodes');

        var width = 960,
            height = 500;

        var svg = d3
            .select('#main')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .call(zoomListener);

        var g = svg
            .append('g');

        var links = g
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

            if (!(found.length === 1)){
                throw Error('Node with id `' + nodeid + '` wasn\'t found')
            }
            
            return found[0];
        }

        var node = g
            .selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')';  })
            .on('click', function(node){
                $(this).find('.desc').toggle();
            });

        var container = node.append("foreignObject")
            .attr('x', -32)
            .attr('y', -32)
            .attr("width", 480)
            .attr("height", 500)
            .append("xhtml:div")
            .attr('class', 'container')

        container.append('img')
            .attr('src', function(d){ return d.imgUrl; })
            .attr('class', 'image');

        container.append('h2')
            .text(function(d){ return d.title; })
            .attr('class', 'title');

        container.append('span')
            .text(function(d){ return d.years; })
            .attr('class', 'years');

        container.append("div")
            .attr('class', 'desc')
            .text(function(d){ return d.desc; });

    }
});

new App.CurrentUserView({ model: new App.CurrentUser() });

