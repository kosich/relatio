export default { render };


function render(el, data){

    let nodes = el
        .selectAll('.node')
        .data(data.nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .append('foreignObject')
        .attr('x', d=>d.x)
        .attr('y', d=>d.y)
        .attr('width', 400)
        .attr('height', 200);

    let container = nodes
        .append('xhtml:div')
        .attr('class', 'container')

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

