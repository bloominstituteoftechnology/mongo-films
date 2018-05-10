import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: []
    }
  }
  componentDidMount() {
    this.getFilms();
  }
  getFilms = () => {
    axios
    .get(`http://localhost:5000/api/films/`)
    .then(response => {
      this.setState({ stuff: response.data })
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <div className="App">
      {this.state.stuff.map(junk => {
        return(
          <div key={junk.episode} className="star-card">
        
            <h2>Episode Number:   {junk.episode}</h2>
            <h2>{junk.title}</h2>
            <h4>Directed by: {junk.director}</h4>
            <p>{junk.opening_crawl}</p>
            </div>
        )
      })}
    
      </div>
    );
  }
}

export default App;
