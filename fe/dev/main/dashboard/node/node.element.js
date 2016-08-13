export default { render };


function render(el, data){

    let nodes = el
        .selectAll('.node')
        .data(data.nodes)
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
            $(this).find('.desc').toggle();
        });

    container.append('img')
        .attr('src', d=>d.imgUrl)
        .attr('class', 'image');

    container.append('h2')
        .text(d=>d.title)
        .attr('class', 'title');

    container.append('span')
        .text(d=>d.years)
        .attr('class', 'years');

    container.append('div')
        .attr('class', 'desc')
        .text(d=>d.desc);

    return nodes;
}

