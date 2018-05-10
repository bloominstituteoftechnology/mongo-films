import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function CardList(props) {
  return (
    <div>
      {props.data.films.map((movie, index) => {
        return (
        <div key={index + movie} className='movieCard'>
          <h1> {movie.title} </h1>
          <h2> Episode {movie.episode} </h2>
          <h2> {movie.release_date} </h2>
          <div> {movie.planets.map((planet, index) => {
            return (
            <div key={index + planet}>
              <h3> {planet.name} </h3>
            </div>
            )
          })} </div>
          <div>
            {movie.characters.map((char, index) => {
              return (
                <div key={index + char}>
                  <h5> {char.name} </h5>
                </div>
              )
            })}
          </div>
        </div>
        )
      })}
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      characters: [],
      species: [],
      starships: [],
      vehicles: [],
      planets: [],
    }
  }

  getFilms() {
    axios
      .get('http://localhost:5000/api/films')
      .then(response => {
        this.setState(() => ({ films: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  };

  getCharacters() {
    axios
      .get('http://localhost:5000/api/characters')
      .then(response => {
        this.setState(() => ({ characters: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  };

  getSpecies() {
    axios
      .get('http://localhost:5000/api/species')
      .then(response => {
        this.setState(() => ({ species: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  };

  getStarships() {
    axios
      .get('http://localhost:5000/api/starships')
      .then(response => {
        this.setState(() => ({ starships: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  };

  getVehicles() {
    axios
      .get('http://localhost:5000/api/vehicles')
      .then(response => {
        this.setState(() => ({ vehicles: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  };

  getPlanets() {
    axios
      .get('http://localhost:5000/api/planets')
      .then(response => {
        this.setState(() => ({ planets: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  };

  theMount() {
    this.getFilms();
    this.getCharacters();
    this.getSpecies();
    this.getStarships();
    this.getVehicles();
    this.getPlanets();
  }

  componentDidMount() {
    this.theMount();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to a Galaxy Far Far Away</h1>
        </header>
        <p className="App-intro"> Lets begin </p>
        <CardList data={this.state} />
      </div>
    );
  }
}

export default App;
