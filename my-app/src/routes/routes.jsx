import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../client/pages/HomePage';
import AddMovie from '../client/pages/AddMovie';

const RenderRoutes = () => (
    <Router>
      <div>
        <Route path="/Home" component={HomePage} />
        <Route path="/" component={AddMovie} />
      </div>
    </Router>
);

export default RenderRoutes;