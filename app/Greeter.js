// Greeter.js
var config = require('./config.json');
import React, {Component} from 'react'

class Greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter



