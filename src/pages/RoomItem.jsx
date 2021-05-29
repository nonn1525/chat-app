import React, { useState, useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Picker, Emoji } from 'emoji-mart';
import styled from 'styled-components';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import 'emoji-mart/css/emoji-mart.css';


const RoomItem = ({content, user}) => {
  const [emojiType, setEmojiType] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [emojiList, setEmojiList] = useState([]);

  const onSelect = emoji => {
    console.log({ emoji });
    setEmojiList([...emojiList, emoji]);
    setEmojiType(null);
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
            
                {user}
              </Typography>
              {}
            </React.Fragment>
          }
        />
      </ListItem>
      <InsertEmoticonIcon onClick={() => setIsOpen(!isOpen)}></InsertEmoticonIcon>
      <PickerStyled>
        {isOpen ? 
          <Picker 
            onSelect={emoji => setEmojiType(JSON.stringify(emoji))} native />
            :
            <></>
          }
          {console.log(emojiType)}
      </PickerStyled>
      {/* {emojiList.length
        ? emojiList.map(({ id, emojiType }, i) => (
        <Emoji
          emoji={emojiType.id}
          size={32}
          onClick={emoji => onSelect({ ...emoji, emojiType })}
          key={i}
        />
        ))
        : null
      } */}
              
    </div>
  )
}

const PickerStyled = styled.div`
  position: fixed;
  top: 40%;
  left: 40%;
`;

export default RoomItem