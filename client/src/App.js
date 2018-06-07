import React, { Component } from 'react';
import FilmList from './components/FriendsList'
import Header from './components/Header'
import axios from 'axios'

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: []
    }
  }
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  destroy = (id) => {
    console.log(id)
    axios.delete(`http://localhost:5000/api/films/${id}`)
      .then(response => {
        axios.get('http://localhost:5000/api/films')
          .then(res => this.setState({ friends: res.data }))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  // submitUser = (e) => {
  //   e.preventDefault();
  //   let newFriend = {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     age: Number(this.state.age)
  //   }
  //   axios.post('http://localhost:5000/api/films', newFriend)
  //     .then(response => {
  //       let friends = [...this.state.friends]
  //       friends.push(response.data.friend)
  //       console.log(response)
  //       this.setState({ friends, age: '', lastName: '', firstName: '', })
  //     })
  //     .catch(err => console.log(err))
  // }

  componentDidMount = () => {
    axios.get('http://localhost:5000/api/films')
      .then(res => {
        // console.log(res)
        this.setState({ films: res.data })
      })

      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <FilmList films={this.state.films} destroy={this.destroy} />
      </div>
    );
  }
}
{/* <div className="header"> */ }
{/* <Form className="form-wrapper">
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input type="name" value={this.state.firstName} onChange={this.handleChange} name="firstName" id="firstName" placeholder="Enter your First Name here" />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input type="lastName" value={this.state.lastName} onChange={this.handleChange} name="lastName" id="lastName" placeholder="Enter your Last Name here" />
            </FormGroup>
            <FormGroup>
              <Label for="Age">Age</Label>
              <Input type="Age" value={this.state.age} onChange={this.handleChange} name="age" id="Age" placeholder="Enter your Age here" />
            </FormGroup>
            <Button type="button" onClick={this.submitUser}>Submit</Button>
            {/* <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="lastName" name="lastName" id="lastName" placeholder="Enter your Last Name here" />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="lastName" name="lastName" id="lastName" placeholder="Enter your Last Name here" />
                </FormGroup> */}
{/* </Form> */ }
{/* // </div> */ }

export default App;
