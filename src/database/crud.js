const Users = require('./model');
const mongoose = require('mongoose');

// function to insert data into db
async function insertData(data) {
  const insertedData = await Users.insertMany([data]);
  return insertData;
}

async function checkId(id){
  return(mongoose.isValidObjectId(id));
}

// function to fetch all data from the db
async function getUserData(id) {
  const isValidId = await checkId(id);
  if(!isValidId)
    return({message: "Invalid id"});
  const data = await Users.find({_id: id}).select({__v: 0});
  return data;
}
async function getAllData() {
  const data = await Users.find({}).select({__v: 0});
  return data;
}

async function deleteData(id){
  const isValidId = await checkId(id);
  if(!isValidId)
    return({message: "Invalid id"});
  const deletedData = await Users.deleteOne({_id : id});
  return deletedData;
}

async function updateData(id, data){
  const isValidId = await checkId(id);
  if(!isValidId)
    return({message: "Invalid id"});
  const updatedData = await Users.updateOne({_id : id}, data);
  return updatedData;
}

module.exports = {
  getAllData,
  insertData,
  deleteData,
  updateData,
  getUserData
};