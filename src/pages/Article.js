import React,{Component} from "react";
import {Logo} from "../asserts/RC";


class Article extends Component{
  render(){
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={Logo} className="App-logo" alt="logo" />
          <p>
            Article Page
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}
export default Article;