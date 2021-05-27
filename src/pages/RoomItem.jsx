import React, { useState, useContext } from 'react';

const RoomItem = ({content, user}) => {
  return (
    <div>
      <p>{user}</p>
      <p>{content}</p>
    </div>
  )
}

export default RoomItem