/*global firebaseUser*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button } from 'antd';

export default class Welcome extends Component {

  logout(){
    firebase.auth().signOut().then(function () {
        window.location.reload();
    }, function () {
        alert('Sign Out Error');
    });
  }

  render() {      
    return <div>
      <h1>Landing Page</h1>
      <ul>
        {!firebaseUser.uid?<li><Link to={'/login?redirectpath=/'}>Login</Link></li>:
        <li><Button onClick={()=>{this.logout()}}>Logout</Button></li>
        }
        <li><Link to={'/User'}>User Page</Link></li>
      </ul>
    </div>
  }
}