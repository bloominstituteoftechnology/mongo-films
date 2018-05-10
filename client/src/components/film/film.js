import React from 'react'
import {Card, CardHeader, CardBody,} from 'reactstrap'
import './FilmCard.css'
const film = props => {

    return (
        <div className='FilmCard'>
            <Card key={props.film._id}>
                <CardHeader>{props.film.title}</CardHeader>
                {console.log(props.film.characters)}

                <CardBody  className='FilmCard_body'>
                    <ul>
                        {props.chars.map((c) => {return <li>{c.name} </li>})}
                    </ul></CardBody>

            </Card>
        </div>
    );
};
export default film;