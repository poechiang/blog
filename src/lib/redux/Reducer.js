import {combineReducers} from "redux";
import {APPEND_ARTICLE} from "./Action";

const ArticleList = (state=[],action)=>{
  switch(action.type){
    case APPEND_ARTICLE:
      return [...(!action.reset?[]:(state||[])),...(action.data||[])];
    default:
      return state;
  }
}
let Reducer = combineReducers({ArticleList})

export default Reducer;