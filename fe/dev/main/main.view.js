const STROKE_WIDTH = 2;

let MainView = Backbone.View.extend({
    el: '#main',
    initialize,
    render
});

function initialize(){
    this.model.on('change', this.render.bind(this));
    this.model.fetch();
}

function render(){
    // RENDER PAGE TITLE
    this.$el.html(`<h1 class="page-title">${ this.model.get('title') }</h1>`);

    // create the zoom listener
    let zoomListener = d3.behavior.zoom()
        .scaleExtent([0.1, 3])
        .on('zoom', zoomHandler);

    // function for handling zoom event
    function zoomHandler() {
        g.attr('transform', `translate(${d3.event.translate})scale(${d3.event.scale})`);
    }

    let WIDTH = this.$el.outerWidth(),
        HEIGHT = this.$el.outerHeight();

    let svg = d3
        .select('#main')
        .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .call(zoomListener);

    let g = svg
        .append('g');

    let links_data = this.model.get('links');
    let nodes_data = this.model.get_nodes();

    let _width_gap = WIDTH*.8/2;
    let _height_gap = HEIGHT*.8;

    nodes_data.forEach(node=>{
        node.x = node.x * _width_gap + (WIDTH - _width_gap)/2 - 200;
        node.y = node.y * _height_gap + (HEIGHT - _height_gap)/2;
    });


    console.log(nodes_data);

    let links = g
        .selectAll('.link')
        .data(links_data)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke-width', d=>d.weight * STROKE_WIDTH)
        .attr('x1', d=>getCoordinatesOfNode(d.a).x)
        .attr('y1', d=>getCoordinatesOfNode(d.a).y)
        .attr('x2', d=>getCoordinatesOfNode(d.o).x)
        .attr('y2', d=>getCoordinatesOfNode(d.o).y);

    function getCoordinatesOfNode(nodeId){
        var node = nodes_data.find(node=> node.id === nodeId);

        if (undefined === node ){
            throw Error(`Node with id "${nodeid}" wasn't found`)
        }
        
        return node;
    }

    let nodes = g
        .selectAll('.node')
        .data(nodes_data)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d=>`translate(${d.x},${d.y})`);

    let container = nodes.append('foreignObject')
        .attr('x', -32)
        .attr('y', -32)
        .attr('width', 400)
        .attr('height', 200)
        .append('xhtml:div')
        .attr('class', 'container')
        .on('click', function(node){
            $(this).toggleClass('selected');
        });

    container.append('img')
        .attr('src', d=>d.imgUrl)
        .attr('class', 'image');

    container.append('h2')
        .text(d=>d.title)
        .attr('class', 'title')
        .on('click', function(node){
            $(this).parent().find('.desc').toggle();
        });

    container.append('span')
        .text(d=>d.years)
        .attr('class', 'years');

    container.append('div')
        .attr('class', 'desc')
        .text(d=>d.desc);

}

export default MainView;
