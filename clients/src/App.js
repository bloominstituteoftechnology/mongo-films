import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Characters from "./filmCharacters";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1> Movies Characters </h1>
          <Route path="/" exact component={Characters} />
        </div>
      </Router>
    );
  }
}

export default App;
