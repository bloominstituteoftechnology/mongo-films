import React, { Component } from 'react';
import axios from 'axios';

class Get extends Component{
charsGet =() =>{
     axios
      .get('http://localhost:5000/characters')
      
      .then(response => {
        this.setState({chars: response.data})
      
      })
      .catch(err =>{
        console.log(err);
    
      })
    }
}
export default Get;