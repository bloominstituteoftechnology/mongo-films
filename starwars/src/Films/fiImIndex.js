import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import FilmList from './filmList'
import Film from './film'
class FilmIndex extends Component{

    state ={
        film:[]
    }
    componentDidMount(){
        
        this.filmGet()
        }

filmGet =() =>{
    axios
     .get('http://localhost:5000/films')
     
     .then(response => {
       this.setState({film: response.data})
     
     })
     .catch(err =>{
       console.log(err);
   
     })
   }

render(){
console.log(this.state)
    return(<div>
         {<Route  exact path ='/Films'
        render= {props => <FilmList {...props} film={this.state.film}/>}
      
        />
    }

      <Route path ='/films/:id' component={Film}/> 
    </div>
    )
}





}
export default FilmIndex