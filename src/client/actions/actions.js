/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

//*********************************** CONVO ACTIONS ***********************************

// when selecting a different conversation
export const selectConvo = (id) => ({
  type: types.SELECT_CONVO,
  payload: id
});

// whenever a new user is created
export const updateUserBase = (newUser) => ({
  type: types.UPDATE_USER_BASE, 
  payload: newUser
})

//*********************************** CHATBOX ACTIONS ***********************************

// updates message eator text input field
export const updateInput = (event) => ({
	type: types.UPDATE_INPUT,
	payload: event.target.value
});

// adds a new message to current chat conversation
export const addMessage = (message) => ({
  type: types.ADD_MESSAGE,
  payload: message
});

export const setConvo = (currentConversation) => ({
  type: types.SET_CONVO,
  payload: currentConversation
});

export const populateUsers = (users) => ({
  type: types.POPULATE_USERS,
  payload: users
});

export const getUsers = () => {
  return dispatch => {
    return fetch("/users")
      .then(res => res.json())
      .then(res => dispatch(populateUsers(res)))
      .catch(error => console.error(error))
  }
};

export function selectConversation(currentUser, conversationPartner) {
  return dispatch => {
    return fetch("/messages/" + currentUser.id + "/" + conversationPartner)
    .then(res => res.json())    
    .then(res => {
      return dispatch(setConvo(res))
    })
    .catch(error => console.error(error))
  }
}

export function refreshConversation(currentUser, conversationPartner) {
  return dispatch => {
    return fetch("/messages/" + currentUser.id + "/" + conversationPartner)
      .then(res => {
        return res.json()
      })
      .then(res => dispatch(setConvo(res)))
      .catch(error => console.error(error))
  }
}

// send message to db and then invoke reducer
export function sendMessage(currentUser, conversationPartner, messageInput) {
	// const message = {
  //   created_by: currentUser.id,
  //   created_at: Date.now().toString(),
  //   message: messageInput
  // }

  console.log('sending', currentUser, conversationPartner, messageInput)

  return dispatch => {
    return fetch("/messages", {
      method: 'POST',
      body: {
        senderId: currentUser,
        receiverId: conversationPartner,
        text: messageInput
      }
    })
      .then(handleErrors)
      // .then(() => addMessage(message))
      .catch(error => console.error(error))
  }
}









// // fetches user data from database
// export const fetchUserDataBegin = () => ({
// 	type: types.FETCH_USER_DATA_BEGIN
// });

// // returns success message for data fetch
// export const fetchUserDataSuccess = (data) => ({
// 	type: types.FETCH_USER_DATA_SUCCESS,
// 	payload: { data }
// });

// // returns failure message for data fetch
// export const fetchUserDataFailure = (error) => ({
// 	type: types.FETCH_USER_DATA_FAILURE,
// 	payload: { error }
// });

// export function fetchUserData(currentUser) {
//   return dispatch => {
//     dispatch(fetchUserDataBegin());
//     return fetch("/" + currentUser)
//       .then(handleErrors)
//       .then(res => res.json())
//       .then(json => {
//         dispatch(fetchUserDataSuccess(json.userData));
//         return json.userData;
//       })
//       .catch(error => dispatch(fetchUserDataFailure(error)));
//   };
// }


// export const selectConversation = () => {}


// // Handle HTTP errors since fetch won't.
// function handleErrors(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
// }