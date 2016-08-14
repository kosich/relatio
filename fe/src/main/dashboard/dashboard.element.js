import $ from 'jquery';

import node_element from './node/node.element.js';
import link_element from './link/link.element.js';

export default { render };

function render($el, data){
    const WIDTH = $el.outerWidth();
    const HEIGHT = $el.outerHeight();

    // create the zoom listener
    let zoomListener = d3.behavior.zoom()
        .scaleExtent([0.1, 3])
        .on('zoom', zoomHandler);

    // function for handling zoom event
    function zoomHandler() {
        g.attr('transform', `translate(${d3.event.translate})scale(${d3.event.scale})`);
    }

    let svg = d3
        .select('#main')
        .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .call(zoomListener);

    let g = svg
        .append('g');


    let _width_gap = WIDTH*.8/2;
    let _height_gap = HEIGHT*.8;

    data.nodes.forEach(node=>{
        node.x = node.x * _width_gap + (WIDTH - _width_gap)/2 - 200;
        node.y = node.y * _height_gap + (HEIGHT - _height_gap)/2;
    });


    // NOTE: disabling links for now
    // link_element.render(g, { links: data.links, nodes: data.nodes });

    const nodes = node_element
      .render(g, { nodes: data.nodes });


    const drag = d3.behavior.drag()
      .origin(function(d) { return d; })
      .on('dragstart', dragstarted)
      .on('drag', dragged)
      .on('dragend', dragended);

    nodes
      .on('click', node_select)
      .call(drag);

    function dragstarted(d) {
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed('dragging', true);
    }

    function dragged(d) {
      d3.select(this)
        .attr('x', d.x = d3.event.x)
        .attr('y', d.y = d3.event.y);
    }

    function dragended(d) {
      d3.select(this).classed('dragging', false);
    }

    function node_select(node){
      $(this)
          .find('.container')
          .toggleClass('selected');
    }


}
