import React, { useState, useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Picker } from 'emoji-mart';
import styled from 'styled-components';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import 'emoji-mart/css/emoji-mart.css';
import dayjs from 'dayjs';



const RoomItem = ({content, user, created}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState('')

  const emojiSelect = emoji => {
    console.log({ emoji });
    setSelectedEmoji(emoji.native)
    setIsOpen(false)
  }

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
        <ListItemText
          primary={content}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                UserName:{user}
                <br />
                {dayjs(created).format('YYYY/MM/DD HH:mm')}
                <InsertEmoticonIcon style={{marginLeft: 20}}onClick={() => setIsOpen(!isOpen)}></InsertEmoticonIcon>
              </Typography>
              {selectedEmoji}
            </React.Fragment>
          }
        />
      </ListItem>
        {isOpen ? 
          <Picker 
            onClick={emojiSelect} native />
            :
            <></>
          }
    </div>
  )
}

export default RoomItem