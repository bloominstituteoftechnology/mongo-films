import React from 'react';
import axios from 'axios';
import Film from './film';
import './FilmCard.css'
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
                // console.log(film);
                this.setState({films: film.data});
            })
    }

    render() {
        return (
          <div className='FilmCard__list'>

                  {this.state.films.map((film) => {

                      let names = film.characters.map((c) => c.name);
                      return <Film film={film} chars={names} key={film._id}/>
                  })}

          </div>
        );
    }
}
export default FilmList;