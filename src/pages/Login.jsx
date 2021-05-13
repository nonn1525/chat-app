import React, { useState, useContext } from 'react';
import firebase from '../config/firebase';
import {AuthContext} from '../AuthService';
import { Redirect } from 'react-router-dom';

const Login = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setEmail(e.target.email.value)
    setPassword(e.target.password.value)

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      history.push('/')
    })
    .catch(err => {
        console.log(err)
    })
  }
    const user = useContext(AuthContext)

    if(user) {
      return <Redirect to ='/' />
    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='password'
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login