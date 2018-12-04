const db = require('../db');
const mongoose = require('mongoose')
const Message = require('../models/message');

//add a new message
const addMessage = (message) => {
  return Message.create(message);
}

//get all conversations between 2 users.
const getConversations = async (senderId, receiverId) => {
  const allSenderMsgs = await Message.find({
    $or:[{senderId: senderId},{receiverId: senderId}]
  })
  // console.log('allsenderMSGS' + allSenderMsgs);
  return allSenderMsgs.filter((msg) => {
    return (msg.receiverId === receiverId || msg.senderId === receiverId); 
  })
}

// // the following two funcs are not used
// const getMessageAsSender = (senderId) => {
//   return Message.find({senderId}).exec();
// }

// const getMessageAsReceiver = (receiverId) => {
//   return Message.find({receiverId}).exec();
// }

module.exports = {
  addMessage,
  getConversations
}