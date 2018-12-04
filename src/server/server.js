const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const db = require('./db');
const { getAllUsers, createUser, getUserById } = require('./controllers/userController');
const { addMessage, getConversations } = require('./controllers/messageController');
// const User = require('./models/user');
const Message = require('./models/message');

//web socket
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// // io.on('connection', (socket) =>{
// //   console.log('a user is connected', socket.id)
// // })

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
//server.listen(80);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));//Added to test sockets

// let staticPath = __dirname + '/../../dist';
// console.log('staticPath ' + staticPath);



// app.use('/', require('./router'));

//Home page route
app.get('/', function (req, res) { 
  res.send('Welcome to Chaxolotl');
  // io.emit('message', req.body); //Added to test sockets
});

//Return all users from database, user object returns username and id only. 
//See userController for ref.
app.get('/users', async (req, res) => {
  const allUsers = await getAllUsers();
  res.send(allUsers);
})

//Create a new user. req.body includes {id: number, username: string, password: string}
app.post('/user', (req,res) => {
  const newUser = createUser(req.body);
  res.send(newUser);
})

//Given an user id, return user object. getUsedById takes in a number as argument.
app.get('/user/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  res.send(user);  
}) 

//Get all messages between two users. getConversation func takes in two numbers as args.
app.get('/messages/:senderId/:receiverId', async(req, res) => {
  // const messages = await getMessageAsSender('5c03130d48834ed55490835c');
  console.log('typeof senderid', typeof req.params.senderId);
  console.log('typeof receiverid', typeof req.params.receiverId);
  const conversations = await getConversations(req.params.senderId, req.params.receiverId);
  res.send(conversations);
})

// Add new message to database. req.body includes {text: string, senderId: number, receiverId: number}
app.post('/messages', async (req, res) => {
  const newMessage = await addMessage(req.body);
  res.send(newMessage);
})




//websocket
// app.post('/messages', async (req, res) => {
//   try{
//     var message = new Message(req.body);

//     var savedMessage = await message.save()
//       console.log('saved');

//     var censored = await Message.findOne({text:'badword'});
//       if(censored)
//         await Message.remove({_id: censored.id})
//       else
//         //io.emit('message', req.body);
//       res.sendStatus(200);
//   }
//   catch (error){
//     res.sendStatus(500);
//     return console.log('error',error);
//   }
//   finally{
//     console.log('Message Posted')
//   }

// })

// io.on('connection', () =>{
//   console.log('a user is connected')
// })


app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('Server listening on localhost:3000')
})




// return all messages (both as sender and receiver) by the user
// app.get('/messages', async(req, res) => {
//   // const messages = await getMessageAsSender('5c03130d48834ed55490835c');
//   const senderMessages = await getMessageAsSender(1);
//   // getMessageAsSender(req.params.senderId)
//   const receiverMessages = await getMessageAsReceiver(1);
//   const allUserMessages = senderMessages.concat(receiverMessages);
//   res.send(allUserMessages);
// })