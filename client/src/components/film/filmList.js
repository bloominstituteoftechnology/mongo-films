import React from 'react';
import axios from 'axios';
import Film from './film';
class FilmList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/films')
            .then(film => {
                console.log(film);
                this.setState({films: film.data});
            })
    }

    render() {
        return (
          <div>
              <ul>
                  {this.state.films.map((film) => {
                      return <li><Film film={film}/></li>
                  })}
              </ul>
          </div>
        );
    }
}
export default FilmList;