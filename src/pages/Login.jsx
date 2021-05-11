import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor='email'>E-mail</label>
          <input
            type='text'
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