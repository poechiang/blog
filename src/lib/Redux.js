import React from "react";
import {Provider} from "react-redux";
import store,{dispatch,getState} from './redux/Store'

export {Provider};



export {store,dispatch,getState}
export default ({children})=>(<Provider store={store}>{children}</Provider>);