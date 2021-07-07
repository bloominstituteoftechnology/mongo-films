import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import FilmsDisplay from './components/FilmsDisplay';

const mdiv = {
  backgroundColor: 'blue'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      films: [],
      characters: []
    };

  }
  componentDidMount = () => {
    this.fetchData()
  }
  fetchData = () => {
    axios.get(`http://localhost:5000/api/films/`)
    .then(res => {
        let fiData = res.data;
        console.log(res.data)
        this.setState({ films: fiData })
    });
    // axios.get(`http://localhost:5000/api/films/`)
    // .then(res => {
    //     let chData = res.data;
    //     console.log(res.data)
    //     this.setState({ characters: chData })
    // });
    // this.fetchContacts()

}
  
  render() {
    return (
      <div className="App" style={mdiv}>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <FilmsDisplay /> */}

        {  this.state.films.map((film,i) => {return (<div key={film + i} > < FilmsDisplay film={film} fetchData={() => this.fetchData()} /> </div> ) } ) }

      </div>
    );
  }
}

export default App;
