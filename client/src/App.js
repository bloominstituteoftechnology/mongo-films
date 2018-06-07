import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      characters: []
    };
  }

  componentDidMount() {
    this.gatherChars();
  }

  gatherChars = () => {
    axios.get('http://localhost:5000/api/films')
      .then(response => {
	console.log(response);
	this.setState({ chars: response.characters });
	console.log();
      })
      .catch(error => console.log(error));
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
	<div>
	  {/*I'm having a hard time with this and I think it's because films is an object, not a map. Still trying to figure out how to get at the array contained within the object*/}
	  {this.state.films.map(char => {
	    return(
	      <ul><li>{char.characters}</li></ul>
	    );
	  })}
       </div>
      </div>
    );
  }
}

export default App;
