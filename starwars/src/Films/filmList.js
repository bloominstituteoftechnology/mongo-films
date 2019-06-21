import React, { Component } from 'react';
import{Link} from 'react-router-dom'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col } from 'reactstrap';
  
const FilmList = props => {
console.log(props.film)
    return (    <React.Fragment>

<div>{props.film.map(film=>{
return(
<Link color="black" style={{ textDecoration: 'none' }}to={`/films/${film._id}`}>
         <Card>
        <CardBody>
          <CardTitle>{film.title}</CardTitle>
          <CardSubtitle>Episode {film.episode}</CardSubtitle>
          <CardText>{film.release_date}</CardText>
           <Col xs="12">
          <CardText>{film.opening_crawl}</CardText>
          </Col>
          <Row><Col xs="12">
          <CardText>{film.director}</CardText>
          </Col>
         

          </Row>
        </CardBody>
      </Card>
</Link>
   

)
})} </div>
        </React.Fragment>
);
}

export default FilmList;
