import React, { Component } from 'react';
import axios from 'axios';
import{Link} from 'react-router-dom'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col } from 'reactstrap';
  
class Char extends Component  {
state={
    char:[]
}
componentDidMount(){
    const {id} =this.props.match.params;
 this.grabById(id)
}
grabById =id =>{
    axios
    .get(`http://localhost:5000/characters/${id}`)
    .then(response =>{
        this.setState(()=> ({char: response.data}))
    })
    .catch(err=>{
        console.log(err)
    })
}
render(){
    console.log()
    return (    <React.Fragment>

         <Card>
        <CardBody>
          <CardTitle>{this.state.char.name}</CardTitle>
          <CardSubtitle>Birth Year: {this.state.char.birth_year}</CardSubtitle>
          <CardText>Gender: {this.state.char.gender}</CardText>
          <Row><Col xs="6">
          <CardText>Skin: {this.state.char.skin_color}</CardText>
          </Col>
          <Col xs="6">
          <CardText>Hair: {this.state.char.hair_color}</CardText>
          </Col>
          <Col xs="6">
          <CardText>Eye: {this.state.char.eye_color}</CardText>
          </Col>
          <Col xs="6">
          <CardText>HGT: {this.state.char.height}</CardText>
          </Col>   
          </Row>
          <Link to="/"style={{ textDecoration: 'none' }}><Button outline color="primary">home</Button></Link>
        </CardBody>
      </Card>

   
        </React.Fragment>
);
}
}

export default Char;
