import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../client/pages/HomePage';
import AddEther from '../client/pages/AddEther';
import SendEther from '../client/pages/SendEther';
const RenderRoutes = () => (
    <Router>
      <div>
        <Route path="/Home" component={HomePage} />

        <Route exact path="/" component={AddEther} />
        <Route path="/Send" component={SendEther} />
      </div>
    </Router>
);

export default RenderRoutes;