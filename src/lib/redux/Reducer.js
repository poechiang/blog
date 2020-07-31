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
let Reducer = combineReducers({ArticleList,Article})

export default Reducer;