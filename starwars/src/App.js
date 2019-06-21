import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import CharIndex from './Characters/charIndex'
import FilmIndex from './Films/fiImIndex'
import PlanetIndex from './Planets/planetIndex'
import Links from './Components/links'
class App extends Component {

  render() {
    return (
      <div className="App">
 <Router><Links /></Router>
    <Router><CharIndex /></Router>

<Router><PlanetIndex/></Router>

<Router><FilmIndex /></Router>



      </div>
    );
  }
}

export default App;
