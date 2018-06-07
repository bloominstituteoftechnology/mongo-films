import React, { Component } from 'react';
/* Additional Dependencies */
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { Route } from 'react-router-dom';
/* Components */
import Character from './components/Character';
import PaperSheet from './components/PaperSheet';

class App extends Component {
  constructor() {
    super();
    this.state = {
      films: [],
      loading: true,
      error: "",
    };
  }

  componentDidMount = () => {
    this.fetch();
  }

  fetch = () => {
    this.setState({ loading: true });
    axios.get('http://localhost:5000/api/films')
      .then(films => {
        this.setState({ films: films.data, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });

      });
  }

  displayFilms = (props) => {
    return (
      <div className="display">
        {
          this.state.loading ?
            <h1>Loading</h1>
          :
            this.state.films.map(film => <PaperSheet key={film._id} {...props} data={film} />)
        }
      </div>
    );
  }

  render = () => {
    return (
      <div className="App">
          <CssBaseline />
          <Route exact path="/" render={(props) => this.displayFilms(props)} />
          <Route path="/character/:id" render={(props) => <Character {...props}/>} />
      </div>
    );
  }
}

export default App;
