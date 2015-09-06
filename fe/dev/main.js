console.log('FUCK YEAH!!!');

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
        this.$el.html( '<h1>' + this.model.get('title') + '</h1>' );

        var links = this.model.get('links');
        var nodes = this.model.get('nodes');

        var width = 960,
            height = 500;

        var svg = d3
            .select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

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
            .attr('dx', 11)
            .attr('dy', '.35em');

        node.append("foreignObject")
            .attr("width", 480)
            .attr("height", 500)
            .attr('dx', 11)
            .attr('dy', '5em')
            .append("xhtml:div")
            .html(function(d){ return d.desc; });

        node.append('image')
            .attr('xlink:href', 'https://github.com/favicon.ico')
            .attr('x', -8)
            .attr('y', -8)
            .attr('width', 16)
            .attr('height', 16);

        var links = svg
            .selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'link')
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

    }
});

new App.CurrentUserView({ model: new App.CurrentUser() });

