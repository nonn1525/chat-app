import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import firebase from '../config/firebase';
import {AuthContext} from '../AuthService';
import styled from 'styled-components';
import { FormGroup, Input } from 'reactstrap';
import List from '@material-ui/core/List';
import RoomItem from './RoomItem';

const Room = () => {
  const [messages, setMessages] = useState(null)
  const [value, setValue] = useState('')

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    firebase.firestore().collection('messages')
      .onSnapshot((snapshot) => {
        const message = snapshot.docs.map(doc => {
          return doc.data()
        })
        setMessages(message)
      })
    }, [])

  const user = useContext(AuthContext)

  const fhandleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
    firebase.firestore().collection('messages').add({
      content: value,
      user: user.displayName,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setValue('')
    document.msgform.reset();
  }

  const handleOnSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <Header>
        <h1 className='bg-secondary'>ChatApp</h1>
      </Header>
      <h1>Room</h1>
        <FormStyled>
        <FormGroup>
          <form
            name='msgform'  
            onSubmit={fhandleSubmit,
                      handleSubmit(handleOnSubmit)}>
          <Input  ref={register({
                        required: 'タイトルは必ず入力してください。'
                    })}
                  type='text' 
                  className='chatinput' 
                  onChange={e => setValue(e.target.value)}
          />
          
        <button 
          className='btn btn-secondary' 
          type='submit'>
            送信
          </button>
          </form>
        </FormGroup>
        <button 
          className='logoutbtn btn btn-secondary' 
          onClick={() => firebase.auth().signOut()}>
            Logout
          </button>
        </FormStyled>
      <List>
        {messages && 
          messages.map(message => {
            return(
              <RoomItem 
                content={message.content} 
                user={message.user} 
                created={message.timestamp} 
              />
            )
          })
        }
      </List>
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

const FormStyled = styled.div`
  .chatinput {
    width: 40%;
  }
  .logoutbtn {
    margin-top: 2px;
  }
  `;

export default Room;