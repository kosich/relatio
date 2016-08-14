const STROKE_WIDTH = 2;

export default { render };

function render(el, data){
    let links = el
        .selectAll('.link')
        .data(data.links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke-width', d=>d.weight * STROKE_WIDTH)
        .attr('x1', d=>getCoordinatesOfNode(d.a).x)
        .attr('y1', d=>getCoordinatesOfNode(d.a).y)
        .attr('x2', d=>getCoordinatesOfNode(d.o).x)
        .attr('y2', d=>getCoordinatesOfNode(d.o).y);

    function getCoordinatesOfNode(nodeId){
        var node = data.nodes.find(node=> node.id === nodeId);

        if (undefined === node ){
            throw Error(`Node with id "${nodeid}" wasn't found`)
        }

        return node;
    }
}
