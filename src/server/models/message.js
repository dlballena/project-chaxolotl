const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: String,
  senderId: String,
  receiverId: String
  // senderId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  // receiverId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }
}, { timestamps: {createdAt: 'created_at'}});


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;