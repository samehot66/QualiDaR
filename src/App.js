import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { HashRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
         <HashRouter>
            <Layout/>
         </HashRouter>
    );
  }
}

export default App;
