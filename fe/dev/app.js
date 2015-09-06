import Main from './main/main.model.js';
import MainView from './main/main.view.js';


let App = {};

App.Main = Main;
App.MainView = MainView;

new App.MainView({ model: new App.Main() });
