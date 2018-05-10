import React from 'react'
import {Card, CardHeader, CardBody,} from 'reactstrap'
import './FilmCard.css'
const film = props => {

    return (
        <div className='FilmCard'>
            <Card>
                <CardHeader>{props.film.title}</CardHeader>
                <CardBody>body</CardBody>
            </Card>
        </div>
    );
};
export default film;