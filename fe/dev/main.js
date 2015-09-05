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

        var links = svg
            .selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('x1', function(d){ return d.x1; })
            .attr('y1', function(d){ return d.y1; })
            .attr('x2', function(d){ return d.x2; })
            .attr('y2', function(d){ return d.y2; });

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

        node.append('image')
            .attr('xlink:href', 'https://github.com/favicon.ico')
            .attr('x', -8)
            .attr('y', -8)
            .attr('width', 16)
            .attr('height', 16);

    }
});

new App.CurrentUserView({ model: new App.CurrentUser() });

