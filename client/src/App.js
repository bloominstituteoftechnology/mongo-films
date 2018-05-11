import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
// material components
import RaisedButton from "material-ui/RaisedButton";
// styles
import "./styles/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: []
    };
  }
  // fetch list of characters from db
  componentDidMount() {
    this.getCharactersList();
  }
  getCharactersList() {
    axios
      .get("http://localhost:5000/api/characters")
      .then(response => {
        this.setState({ characters: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state.characters);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RaisedButton>Testing</RaisedButton>
      </div>
    );
  }
}

export default App;
