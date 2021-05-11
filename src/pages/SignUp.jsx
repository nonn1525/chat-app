import React, { useState } from 'react';
import firebase from '../config/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.value
    console.log(value)

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err)
      })
  }
  
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            name='email' 
            type='email' 
            id='email' 
            placeholder='Email' 
          />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input 
                name='password' 
                type='password' 
                id='password' 
                placeholder='Password' 
            />
          </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp