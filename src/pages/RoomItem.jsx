import React, { useState, useContext } from 'react';

const RoomItem = ({content, user}) => {
  return (
    <div>
      <p>user:{user}</p>
      <p>message:{content}</p>
    </div>
  )
}

export default RoomItem