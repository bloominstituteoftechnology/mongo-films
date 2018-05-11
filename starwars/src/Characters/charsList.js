import React, { Component } from 'react';
import{Link} from 'react-router-dom'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col } from 'reactstrap';
  
const CharsList = props => {
console.log(props.chars)
    return (    <React.Fragment>

<div>{props.chars.map(char=>{
return(
<Link color="black" style={{ textDecoration: 'none' }}to={`/characters/${char._id}`}>
         <Card>
        <CardBody>
          <CardTitle>{char.name}</CardTitle>
          <CardSubtitle>Birth Year: {char.birth_year}</CardSubtitle>
          <CardText>Gender: {char.gender}</CardText>
          <Row><Col xs="6">
          <CardText>Skin: {char.skin_color}</CardText>
          </Col>
          <Col xs="6">
          <CardText>Hair: {char.hair_color}</CardText>
          </Col>
          <Col xs="6">
          <CardText>Eye: {char.eye_color}</CardText>
          </Col>
          <Col xs="6">
          <CardText>HGT: {char.height}</CardText>
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

export default CharsList;
