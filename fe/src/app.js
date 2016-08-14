import 'babel-polyfill';

import 'jquery';
import 'underscore';
import 'backbone';
import 'd3';

import Main from './main/main.model.js';
import MainView from './main/main.view.js';

import './app.scss';

let App = {};

App.Main = Main;
App.MainView = MainView;

new App.MainView({ model: new App.Main() });
