import React, { useState, useEffect, useContext } from 'react';
import firebase from '../config/firebase';
import {AuthContext} from '../AuthService';
import RoomItem from './RoomItem';

const Room = () => {
  const [messages, setMessages] = useState(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    firebase.firestore().collection('messages')
      .onSnapshot((snapshot) => {
        const message = snapshot.docs.map(doc => {
          return doc.data()
        })
        setMessages(message)
      })
    }, [])

    console.log(messages)

  const user = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    firebase.firestore().collection('messages').add({
      content: value,
      user: user.displayName
    })
    setValue('')
  }

  return (
    <div>
      <h1>Room</h1>
      <ul>
        <RoomItem 
          content={messages.content} 
          user={messages.user} 
        />
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text"
              onChange={e => {
                setValue(e.target.value)
              }}
        />
      <button type='submit'>送信</button>
      </form>
      <button onClick={() => firebase.auth().signOut()}>Logout</button>
    </div>
  )
}

export default Room;