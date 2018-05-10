import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import CharIndex from './Characters/charIndex'
import FilmIndex from './Films/fimIndex'
import PlanetIndex from './Planets/planetIndex'

class App extends Component {

  state={
    chars:[],
    planets:[],
    films:[]
  }
  componentDidMount(){

    this.props.charsGet()
    }
  render() {
    return (
      <div className="App">
    <Router>
<CharIndex chars={this.state.chars}/>
</Router>
<Router>
<PlanetIndex planets={this.state.planets}/>
</Router>
<Router>
<FilmIndex films={this.state.films}/>
</Router>
      </div>
    );
  }
}

export default App;
