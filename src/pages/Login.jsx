import React, { useState, useContext } from 'react';
import firebase from '../config/firebase';
import { useForm, Controller, } from "react-hook-form";
import { AuthContext } from '../AuthService';
import { Redirect } from 'react-router-dom';
import { FormGroup, Input, Label, Button } from 'reactstrap';
import styled from 'styled-components';

const Login = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const { 
  //   formState: {errors}, 
  //   handleSubmit, 
  //   control,
  // } = useForm();

  // const onSubmit = (data) => {
  //   console.log("Submit:", data)
  //   setEmail(e.target.email.value)
  //   setPassword(e.target.password.value)

  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then(() => {
  //     history.push('/')
  //   })
  //   .catch(err => {
  //       console.log(err)
  //   })
  // }
  // console.log("Errors:", errors);

  const handleSubmit = (e) => {
    e.previentDefault()

    setEmail(e.target.email.value)
    setPassword(e.target.password.value)

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
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
       <Header>
        <h1 className='bg-secondary'>ChatApp</h1>
      </Header>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            type='email'
            id='email'
            name='email'
            placeholder='Email'
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            name='password'
            placeholder='password'
          />
        </div>

        <Button type='submit'>Login</Button>
      </form>
      <Button 
        onClick={() => {
          history.push('/SignUp')
        }}>新規登録</Button>
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

export default Login