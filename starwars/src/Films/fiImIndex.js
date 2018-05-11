import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import CharsList from './filmList'
import Char from './film'
class FilmIndex extends Component{

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
        {<Route exact path ='/'
        render= {props => <CharsList {...props} chars={this.state.chars}/>}
      
        />
    }

      <Route path ='/characters/:id' component={Char}/>
    </div>
    )
}





}
export default FilmIndex