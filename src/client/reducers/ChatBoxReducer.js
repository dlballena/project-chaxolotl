/**
 * ************************************
 *
 * @module  ChatBoxReducer
 * @author
 * @date
 * @description reducer for ChatBox data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {

	// user that's logged in
	currentUser: {username: 'Chris', id: '3'},

	// array of all users of application
	userBase: {
	},

	// current conversation being displayed in chatbox
	conversationPartner: '',

	// keps track of the current conversation that is displayed in chatbox
  currentConversation: [],


	// all conversations including currentUser
  userConversations: {
	},

	// dynamically updating what user inputs in text field
	messageInput: '',

	// for fetching data
	loading: false,
	error: null
  
}

const ChatBoxReducer = (state=initialState, action) => {
	let currentConversation;

	switch(action.type) {

    case types.POPULATE_USERS: 
      const userBase = Object.assign({}, state.userBase);
      Object.keys(userBase).forEach(key => delete userBase[key]);
      action.payload.forEach((user) => userBase[user.id] = user.username);

      return {
        ...state, 
        userBase: userBase
      }
      
    //******************* SELECT CONVO ACTIONS *******************

    case types.SELECT_CONVO:
      
			const partner = action.payload;

			return {
				...state,
				conversationPartner: action.payload,
			}

		case types.SET_CONVO: 
      currentConversation = state.currentConversation.slice();
      currentConversation = action.payload;

      return {
        ...state,
        currentConversation: currentConversation
      }

    //******************* CHAT BOX ACTIONS *******************

		case types.UPDATE_INPUT: 
			return {
				...state,
				messageInput: action.payload
			}

    case types.ADD_MESSAGE:
      // creates a deep copy of userConversations
      const userConversations = Object.assign({}, state.userConversations);
      // targets conversation partner
      const otherUser = state.conversationPartner;
      const message = action.payload;

      currentConversation = state.currentConversation.slice()
      currentConversation.push(message);
      
      // assigns array copy to object copy
			userConversations[otherUser] = currentConversation;

			return {
        ...state,
        // updates userConversations object
        userConversations: userConversations,
        currentConversation: currentConversation,
        messageInput: ''
			}

		// boiler plate for fetching data from db
		case types.FETCH_USER_DATA_BEGIN:
			return {
					...state,
					loading: true,
					error: null
				};

		case types.FETCH_USER_DATA_SUCCESS:
			const userData = action.payload;

			return {
					...state,
					loading: false,
          userBase: userData.userBase,
					userConversations: userData.userConversations
				};

		case types.FETCH_USER_DATA_FAILURE:
			 return {
        ...state,
        loading: false,
        error: action.payload.error,
        userConversations: []
      };
		
		default: 
			return state;
	}
}

export default ChatBoxReducer;