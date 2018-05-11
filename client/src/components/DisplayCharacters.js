import React from 'react';

const DisplayCharacters = props => {
    return (
        <div>
            {/* <h2>Inside of Display characters</h2> */}
            <h4>Name of Character:{props.character.name}</h4>
            </div>
    )
}
export default DisplayCharacters;