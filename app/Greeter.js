// Greeter.js
var config = require('./config.json');
import React, {Component} from 'react';
import styles1 from './Greeter.css';//导入

class Greeter extends Component{
  render() {
    return (
      <div className={styles1.root}>
        {config.greetText}
      </div>
    );
  }
}

export default Greeter



