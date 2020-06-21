import {createStore} from "redux";
import Reducer from "./Reducer";

let store = createStore(Reducer,{ArticleList:[]})

const {dispatch,getState} = store;

export {createStore,dispatch,getState};

export default store;