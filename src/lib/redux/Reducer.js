import {combineReducers} from "redux";
import actions from "./Action";

const ArticleList = (state=[],action)=>{
  switch(action.type){
    case actions.REMOVE_ARTICLE:
      return [...(!action.reset?[]:(state||[])),...(action.data||[])];
    default:
      return state;
  }
}
const Article = (state=[],action)=>{
  switch(action.type){
    case actions.POST_ARTICLE:
      return [...(!action.reset?[]:(state||[])),...(action.data||[])];
    default:
      return state;
  }
}
const post = (state={},action)=>{
  switch(action.type){
    case actions.UPDATE_POST_DATA:
      let {type,...data} = action;
      return Object.assign({},state,data)
    default:
      return state;
  }
}

let Reducer = combineReducers({ArticleList,Article,post})

export default Reducer;