/**
 * ************************************
 *
 * @module  MessageDisplay
 * @author
 * @date
 * @description presentation component that renders Message
 *
 * ************************************
 */

import React from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (store) => ({  
  currentUser: store.chatbox.currentUser,
  conversationPartner: store.chatbox.conversationPartner,
  currentConversation: store.chatbox.currentConversation
});

const mapDispatchToProps = (dispatch) => ({
	refreshConversation: (currentUser, conversationPartner) => {dispatch(actions.refreshConversation(currentUser, conversationPartner))}
});

const MessageDisplay = ({ currentUser, currentConversation, conversationPartner, refreshConversation }) => {

	// dynamically creates individual instances of Message Component 
  const messages = currentConversation.map((messageObj, index) => {
    return (
      <Message
        key={'message' + index} 
        currentUser={ currentUser} 
        created_by={messageObj.senderId || messageObj.created_by}
        created_at={messageObj.created_at}
        message={messageObj.text || messageObj.message} 
      />
    )
  });

  //setTimeout(refreshConversation(currentUser, conversationPartner), 2000);

  // renders messages
  return (
    <div className="message-display" style={style.messageDisplay}>
      {messages}
    </div>
  )
};

const style = {
  messageDisplay: {
    border: "0.2rem solid black",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "90%", 
    height: "20rem",
    maxHeight: "20rem",
    padding: "0.4rem",
    overflow: "scroll",
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDisplay);