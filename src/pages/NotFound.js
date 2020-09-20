import React,{Component} from "react";
import {Logo} from "../asserts/RC";


class NotFound extends Component{
  render(){
    return (

      <div className="App">
        <header className="App-header">
          <img src={Logo} className="App-logo" alt="logo" />
          <p>
            NotFound Page
          </p>
        </header>
      </div>
    )
  }
}
export default NotFound;