import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class Welcome extends Component {
    render() {
      return <div>
          <h1>Landing Page</h1>
          <ul>
            <li><Link to={'/login?redirectpath=/'}>Login Page</Link></li>
            <li><Link to={'/logout'}>Logout Not Implemented</Link></li>
            <li><Link to={'/User'}>User Page functionalities work only after you are logged in</Link></li>
          </ul>
        </div>
    }
}