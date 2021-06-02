import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from "react-hook-form";
import firebase from '../config/firebase';
import {AuthContext} from '../AuthService';
import styled from 'styled-components';
import { FormGroup, Input, Button } from 'reactstrap';
import List from '@material-ui/core/List';
import RoomItem from './RoomItem';

const Room = () => {
  const [messages, setMessages] = useState(null)
  const [value, setValue] = useState('')

  const { register, name, formState: {errors}, handleSubmit, control, rules } = useForm();
  const handleonSubmit = (data) => {
    console.log(data)
  }
  // const {
  //   field: { ref, ...rest },
  // } = useController({ name, control, rules })

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
    handleSubmit(handleonSubmit)
    firebase.firestore().collection('messages').add({
      content: value,
      user: user.displayName,
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
      {/* <Controller 
        name='msg' 
        control={control}
        render={({ field : onChange, onBlur, value, ref}) => ( */}
        <FormGroup>
          <form 
            name='msgform'  
            onSubmit={fhandleSubmit}
            >
             
          <Input 
          //  {...field}
                  type='text' 
                  className='chatinput' 
                  name='chatInput'
                  onChange={e => setValue(e.target.value)}
                  {...register("chatInput", {
                    required: true, minLength: 1
                  })}
                  error={Boolean(errors.chatInput)}
                  helperText={errors.chat && <p>required</p>}
                  />
          
        <button 
          className='btn btn-secondary' 
          type='submit'>
            送信
          </button>
          </form>
        </FormGroup>
        {/* )}
          rules={{required: true}}
          /> */}
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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
      <input
        label="example1"
        fullWidth
        name="example1"
        inputRef={inputRef}{...inputProps}
        error={Boolean(errors.example1)}
        helperText={errors.example1 && "文章が短いよ！"}
      />

        <Button type="submit" >
          submit
        </Button>
      
    </form> */}
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