const db = require('../db');
const mongoose = require('mongoose')
const Message = require('../models/message');

//add a new message
const addMessage = (message) => {
  return Message.create(message);
}

//get all conversations between 2 users.
const getConversations = async (sender, receiver) => {
  
  const query1 = {};
  query1['senderId'] = sender;

  const query2 = {};
  query2['receiverId'] = sender;

  const allSenderMsgs = await Message.find({
    $or:[query1, query2]
  }, (err, result) => result.filter((msg) => {
    return (msg.receiverId === receiver || msg.senderId === receiver); 
  }));
}

// // the following two funcs are not used
// const getMessageAsSender = async(senderId) => {
//   const hi = await Message.find({senderId}).exec();
//   console.log(hi);
//   return hi;
// }

// const getMessageAsReceiver = (receiverId) => {
//   return Message.find({receiverId}).exec();
// }

module.exports = {
  addMessage,
  // getMessageAsSender,
  // getMessageAsReceiver,
  getConversations
}

// // the following two funcs are not used
// const getMessageAsSender = async(senderId) => {
//   const hi = await Message.find({senderId}).exec();
//   console.log(hi);
//   return hi;
// }

// const getMessageAsReceiver = (receiverId) => {
//   return Message.find({receiverId}).exec();
// }
