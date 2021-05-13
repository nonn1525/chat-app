import React, { useState } from 'react';
import firebase from '../config/firebase';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setName(e.target.name.value)
    setEmail(e.target.email.value)
    setPassword(e.target.password.value)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      user.updateProfile({
        displayName:name
      })
    })
      .catch(err => {
        console.log(err)
      })
  }
  
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name='name' 
            type='name' 
            id='name' 
            placeholder='Name' 
          />
          </div>
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