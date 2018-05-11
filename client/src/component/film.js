import React, { Component } from "react";
import axios from "axios";

export default class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/films")
      .then(response => {
        this.setState(() => ({ films: response.data }));
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    // console.log(this.state.films[0] ? this.state.films[0].title : "Loading");
    return (
      <div>
        <h1>List</h1>
        <div>
          {this.state.films.map(eachFilm => (
            <div key={eachFilm._id}>
              <div>{eachFilm.title}</div>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
