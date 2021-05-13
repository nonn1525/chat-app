import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Room from './pages/Room';
import './App.css';
import {AuthProvider} from './AuthService';
import LoggedInRoute from './LoggedInRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path='/' component={Room} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App;
