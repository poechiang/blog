import React from 'react';
import { BrowserRouter ,Route,Switch} from 'react-router-dom';

import Home from "./pages/Home";
import Article from "./pages/Article";
import About from "./pages/About";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";


const App = () => (
  <BrowserRouter><Switch>
    <Route path='/' exact component={Home}/>
    <Route path='/articles/:aid' component={Article} />
    <Route path='/post' exact component={Post} />
    <Route path='/about' exact component={About} />
    <Route path='*' component={NotFound} />
  </Switch></BrowserRouter>
)

export default App;
