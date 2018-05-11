import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchingMoviesActionCreator } from "./allActions";

class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    fetchingMoviesActionCreator();
  };
  render() {
    console.log("films", this.props.films);
    const filmCharacters = this.props.films
      .map(film => film.characters)
      .map(x =>
        x.map(p => (
          <div>
            <li>{p.name}</li>
          </div>
        ))
      );

    console.log("filmCharacters", filmCharacters);
    return <div>{filmCharacters}</div>;
  }
}
const mapStateToProps = state => {
  console.log("state", state.filmsReducer);
  return { films: state.filmsReducer };
};
export default connect(mapStateToProps, fetchingMoviesActionCreator)(
  Characters
);
