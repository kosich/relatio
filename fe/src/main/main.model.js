let model = Backbone.Model.extend({
    url: 'data.json',
    get_nodes (){
        let data = this.get('nodes');

        let all_times = data.map(n=>n.time);

        let min = Math.min(...all_times);
        let max = Math.max(...all_times);
        let diff = Math.abs(max-min);

        data.forEach(n=>{
            n.y = Math.abs(n.time - min)/diff;
            n.x = Math.random();
        });

        return data;
    }
});


export default model;
