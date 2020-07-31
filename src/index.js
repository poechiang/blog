import React from 'react';
import ReactDOM from 'react-dom';


import {createStore} from "redux";
import {Provider} from "react-redux";


import Reducer from "./lib/redux/Reducer";

import * as serviceWorker from './serviceWorker';


import 'antd/dist/antd.dark.less';
import './asserts/styles/global.less';



import App from './App';

let store = createStore(Reducer,{ArticleList:[]})


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
