import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';

const StyledDiv = styled.div`
width: 600px; 
height: 100px; 
border: 2px solid black;
padding-top: 25px; 
margin: 0 auto; 
margin-bottom: 10px;  
background: white; 
box-shadow: 3px 5px; 
font-weight: bolder; 
&:hover{
  background: lightblue; 
  box-shadow: none; 
}`;

const Li = styled.div`
padding: 2px; 
font-size: 20px; 
`;

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.getFilms();
  }

  getFilms = () => {
    axios
      .get("http://localhost:5000/api/films")
      
      .then(response => {
        console.log( response.data)
        this.setState({ films: response.data });

      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
        </header>
        <div>
          {this.state.films.map(film => {
            return (
              <StyledDiv>
                <span key={film.id} className="film"></span>
                <Li className="name">{film.title}</Li>
                <Li className="name">{film.director}</Li>
                <Li className="date">{`Release Date:${film.release_date
}`}</Li>
              </StyledDiv>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
