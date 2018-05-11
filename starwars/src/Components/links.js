import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';
import{Link} from 'react-router-dom'

const Links =()=>{
    return( <React.Fragment>
    
    <ButtonGroup>  <Link color="black" style={{ textDecoration: 'none' }}to='/'>
        <Button onClick={()=>window.location.reload()}>Home</Button>
        </Link>
    <Link color="black" style={{ textDecoration: 'none' }}to='/characters'>
        <Button onClick={()=>window.location.reload()}>characters</Button>
        </Link>
        <Link color="black" style={{ textDecoration: 'none' }}to='/films'>
        <Button onClick={()=>window.location.reload()}>Films</Button>
        </Link>
        <Link color="black" style={{ textDecoration: 'none' }}to='/planets'>
        <Button>Planets</Button>
        </Link>
      </ButtonGroup>

    </React.Fragment> )
}






export default Links