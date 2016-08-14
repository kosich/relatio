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
        .attr('width', 64)
        .attr('height', 64);


    let container = nodes
        .append('xhtml:div')
        .attr('class', 'container')

    container.append('img')
        .attr('src', d=>d.imgUrl)
        .attr('class', 'image');

    let wrapper = container
        .append('xhtml:div')
        .attr('class', 'wrapper');

    wrapper
        .append('h2')
        .text(d=>d.title)
        .attr('class', 'title');

    wrapper
        .append('span')
        .text(d=>d.years)
        .attr('class', 'years');

    wrapper
        .append('div')
        .attr('class', 'desc')
        .text(d=>d.desc);

    return nodes;
}

