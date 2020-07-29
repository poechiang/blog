import React from 'react';

import history,{ Router, Route } from './lib/Router';

import {Home,Article,About,Post} from './Pages';

const App = () => (
  <Router history={history}>
    <Route path='/' exact component={Home}/>
    <Route path='/article' component={Article} />
    <Route path='/post' component={Post} />
    <Route path='/about' component={About} />
  </Router>
)

export default App;
