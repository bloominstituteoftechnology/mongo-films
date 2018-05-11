import React from 'react';
import DisplayPlanets from './DisplayPlanets';
import DisplayCharacters from './DisplayCharacters';
const main = {
    border: '2px solid red',
    backgroundColor: 'beige',
    marginBottom: 36,
    maxWidth: 1024,
    display: 'flex-box',
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%'
};
const backgound = {
    backgroundColor: 'orange'
}

const FilmsDisplay = props => {
    return (
        <div style={backgound}  >
            <div style={main}>
                <h1>Film Title: {props.film.title}</h1>
                <h3>Producer: {props.film.producer}</h3>
                <h3>Release Date: {props.film.release_date}</h3>

                {/* <h1>Hey</h1> */}
                <h5>{props.film.planets.map((planet, i) => {
                    return (
                        <div key={planet + i}>
                            <DisplayPlanets planet={planet} />
                        </div>
                    )
                })}</h5>
                <h5>{props.film.characters.map((character, i) => {
                    return (
                        <div key={character + i}>
                            <DisplayCharacters character={character} />
                        </div>
                    )
                })}</h5>
            </div>
        </div>
    )
}
export default FilmsDisplay;