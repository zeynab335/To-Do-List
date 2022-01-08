import React , {Component}  from 'react';
import {BrowserRouter } from 'react-router-dom'  ;




// css files
import '../src/Component/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import 'bootstrap/dist/js/bootstrap.min.js';

import AllApp from './Component/AllApp';




class App extends Component {
  render() { 
    return ( 
      <BrowserRouter>
        <AllApp/>
    
      </BrowserRouter> 
      
    );
  }
}

export default App;
