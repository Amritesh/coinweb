import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Landing from './components/landing/Landing';
import User from './components/user/User';

class App extends Component{

  render(){
      return (
          <BrowserRouter>
              <div className="app-shell">
                  {/* <Route path="/" component={x => <Header history={x.history} displaySearch={true} transparent={false} />} /> */}
                  <Switch>
                      <Route exact path="/" component={Landing} />
                      <Route path="/login" component={Login} />
                      <Route path="/user" component={User} />
                      <Route component={()=>
                          <h2 style={{margin:'auto'}}>You are entering hostile territory. Find some other way.</h2> 
                      }/>
                  </Switch>
              </div>
          </BrowserRouter>
      );
  }
}

export default App;
