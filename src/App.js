import React from 'react';

import history,{ Router, Route } from './lib/Router';

import {Home,Article,About} from './Pages';

const App = () => (
  <Router history={history}>
    <Route path='/' component={Home}/>
    <Route path='art' component={Article} />
    <Route path='about' component={About} />
  </Router>
)

export default App;
