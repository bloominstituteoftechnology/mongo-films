import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import CharsList from './charsList'
import Char from './char'
import Links from '../Components/links'
class CharIndex extends Component{

    state ={
        chars:[]
    }
    componentDidMount(){
        
        this.charsGet()
        }

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

render(){
console.log(this.state)
    return(<div>
         {/* <CharsList chars={this.state.chars}/> */}
        {<Route exact path ='/characters'
        render= {props => <CharsList {...props} chars={this.state.chars}/>}
      
        />
    }

      <Route path ='/characters/:id' component={Char}/>
    </div>
    )
}





}
export default CharIndex