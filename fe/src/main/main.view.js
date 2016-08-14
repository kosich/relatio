import dashboard_element from './dashboard/dashboard.element';

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
    this.$el.html(`<h1 class="page-title">H</h1>`);

    const links = this.model.get('links');
    const nodes = this.model.get_nodes();

    dashboard_element.render(this.$el, { links, nodes });
}

export default MainView;
