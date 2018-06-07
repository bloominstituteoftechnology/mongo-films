import React, { Component } from 'react';
/* Additional Dependencies */
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import { Route } from 'react-router-dom';
/* Components */
import CardList from './components/CardList';
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

  displayData = (props) => {
    return (
      <div className="display">
        {
          this.state.loading ?
            <h1>Loading</h1>
          :
            this.state.films.map(film => <PaperSheet {...props} film={film} />)
        }
      </div>
    );
  }
  render = () => {
    return (
      <div className="App">
          <CssBaseline />
          <Route exact path="/" render={(props) => this.displayData(props)} />
      </div>
    );
  }
}

export default App;
