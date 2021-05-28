import React, { useState } from 'react';
import firebase from '../config/firebase';
import styled from 'styled-components';

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
       <Header>
        <h1 className='bg-secondary'>ChatApp</h1>
      </Header>
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

const Header = styled.div`
h1 {
  width: 100%;
  height: 80px;
  color: white;
  line-height: 80px;
  padding-left: 30px; 
}
`;

export default SignUp