const db = require('../db');
const mongoose = require('mongoose')
const User = require('../models/user');

//return all users from db, but only display username and id
const getAllUsers = async() => {
  return User.find({})
  .select('username id')
  .exec();
}

//create a new user
const createUser = (userDetails) => {
  return User.create(userDetails)
}

//getUser from User collection
const getUserById = (id) => {
  return User.findOne({id}).exec();
}


module.exports = {
  getAllUsers,
  createUser,
  getUserById
}