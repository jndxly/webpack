import Layer from './components/layer/layer.js';
import './css/common.css';

const App = function(){
const NUM = 1;

var layer = new Layer();

var app = document.getElementById("app");
app.innerHTML = layer.tpl({

    name:"jndxly",
    arr:["webpack","vue"]
});

}


new App()