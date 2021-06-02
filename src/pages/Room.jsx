import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import firebase from '../config/firebase';
import {AuthContext} from '../AuthService';
import styled from 'styled-components';
import { FormGroup, Input } from 'reactstrap';
import List from '@material-ui/core/List';
import RoomItem from './RoomItem';
import { nanoid } from 'nanoid';

const Room = () => {
  const [messages, setMessages] = useState(null)
  const [value, setValue] = useState('')
  const [created, setCreated] = useState('')

  const { 
    formState: {errors}, 
    handleSubmit, 
    control
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submit:", data)
  }
  console.log("Errors:", errors);

  useEffect(() => {
    firebase.firestore().collection('messages')
      .onSnapshot((snapshot) => {
        const message = snapshot.docs.map(doc => {
          return doc.data()
        })
        setMessages(message)
        setCreated(created)
      })
    }, [])

  const user = useContext(AuthContext)

  const fhandleSubmit = () => {
    firebase.firestore().collection('messages').add({
      content: value,
      user: user.displayName,
      id: nanoid(),
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setValue('')
    document.msgform.reset();
  }

  return (
      <div>
      <Header>
        <h1 className='bg-secondary'>ChatApp</h1>
      </Header>
      <h1>Room</h1>
        <FormStyled>
        <form 
          name='msgform'  
          onSubmit={handleSubmit(onSubmit), fhandleSubmit}
          >
      <FormGroup>
      <Controller 
        name='msg' 
        control={control}
        render={({field}) => (
          <Input 
            type='text' 
            className='chatinput'
            onChange={e => setValue(e.target.value)}
          />
        )}
        rules={{
          required: true
        }}
      />
      <button 
        className='btn btn-secondary' 
        type='submit'>
          送信
      </button>
    </FormGroup>
        </form>
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