import React, { Component } from 'react';
import axios from 'axios';
import{Link} from 'react-router-dom'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Row,Col } from 'reactstrap';
  
class Film extends Component  {
state={
    film:[]
}
componentDidMount(){
    const {id} =this.props.match.params;
 this.grabById(id)
}
grabById =id =>{
    axios
    .get(`http://localhost:5000/films/${id}`)
    .then(response =>{
        this.setState(()=> ({film: response.data}))
    
    })
    .catch(err=>{
        console.log(err)
    })
}
render(){
    console.log(this.state)
    return (    <React.Fragment>

             <Card>
        <CardBody>
          <CardTitle>{this.state.film.title}</CardTitle>
          <CardSubtitle>Episode {this.state.film.episode}</CardSubtitle>
          <CardText>{this.state.film.release_date}</CardText>
           <Col xs="12">
          <CardText>{this.state.film.opening_crawl}</CardText>
          </Col>
          <Row><Col xs="12">
          <CardText>{this.state.film.director}</CardText>
          </Col>
         
          </Row>
                    <Link to="/"style={{ textDecoration: 'none' }}><Button outline color="primary">home</Button></Link>

        </CardBody>
      </Card>

   
        </React.Fragment>
);
}
}

export default Film;
