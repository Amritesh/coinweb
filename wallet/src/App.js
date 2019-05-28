import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Landing from './components/landing/Landing';
import User from './components/user/User';
import { Layout } from 'antd';
const { Header, Footer } = Layout;
class App extends Component{

  render(){
      return (
          <BrowserRouter>
              <div className="app-shell">
                  <Route path="/" component={x => <Header><h1 style={{color:'white'}}>Coinweb</h1></Header>} />
                  <Switch>
                      <Route exact path="/" component={Landing} />
                      <Route path="/login" component={Login} />
                      <Route path="/user" component={User} />
                      <Route component={()=>
                          <h2 style={{margin:'auto'}}>You are entering hostile territory. Find some other way.</h2> 
                      }/>
                  </Switch>
                  <Route path="/" component={x => <Footer>Footer</Footer>} />
              </div>
          </BrowserRouter>
      );
  }
}

export default App;
