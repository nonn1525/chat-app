import React, { useState } from 'react';
import firebase from '../config/firebase';
import { useForm, Controller, } from "react-hook-form";
import { FormGroup, Input } from 'reactstrap';
import styled from 'styled-components';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // const onSubmit = (data) => {
  //   console.log("Submit:", data)
  //   setName(e.target.name.value)
  //   setEmail(e.target.email.value)
  //   setPassword(e.target.password.value)

  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //   .then(({user}) => {
  //     user.updateProfile({
  //       displayName:name
  //     })
  //   })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
  console.log("Errors:", errors);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            name='name' 
            type='name' 
            id='name' 
            placeholder='Name' 
          />
          </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
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