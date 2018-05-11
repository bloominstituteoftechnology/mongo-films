import React, { Component } from "react";
import logo from "./logo.svg";
import axios from "axios";
// components
import CharacterList from "./components/CharacterList";
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
        <h1>Mongo Films</h1>
        <CharacterList characters={this.state.characters} />
      </div>
    );
  }
}

export default App;
