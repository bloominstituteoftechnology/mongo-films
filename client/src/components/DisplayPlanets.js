import React from 'react';
const plnStyle = {
    border: '2px solid yellow'
}
const DisplayPlanets = props => {
    return (
        <div style={plnStyle}>
            <h1>Planet {props.planet.name} </h1>
            <h3>Climate: {props.planet.climate}</h3>
            <h3>diameter: {props.planet.diameter}</h3>
            <h3>terrain: {props.planet.terrain}</h3>
            <h3>gravity: {props.planet.gravity}</h3>
            </div>
    )
}

export default DisplayPlanets;