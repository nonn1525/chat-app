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


const RoomItem = ({content, user}) => {
  const [emoji, setEmoji] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
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
                {user}
              </Typography>
              {}
              <InsertEmoticonIcon onClick={() => setIsOpen(!isOpen)}>絵文字</InsertEmoticonIcon>
              <PickerStyled>
                {isOpen ? 
                  <Picker onSelect={emoji => setEmoji(emoji)} />
                  :
                  <></>
                }
              </PickerStyled>
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  )
}

const PickerStyled = styled.div`
  position: fixed;
  top: 40%;
  left: 40%;

`;

export default RoomItem