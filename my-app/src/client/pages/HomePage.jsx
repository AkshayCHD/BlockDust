import React, { Component } from 'react';
import Nav from '../components/Nav';

class HomePage extends Component {
    constructor(props) {
      super(props);
    }
      
    render() {
        return (
        <div className="center">
            <Nav />
            <h1>balle balle</h1>
        </div>
      );
    }
}

export default HomePage;