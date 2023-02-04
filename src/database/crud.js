const Users = require('./model');

// function to insert data into db
async function insertData(data) {
  const insertedData = await Users.insertMany([data]);
  return insertData;
}

// function to fetch all data from the db
async function getUserData(id) {
  const data = await Users.find({_id: id}).select({__v: 0});
  return data;
  // const database = await getDatabase();
  // return await database.collection(collectionName).find({}).toArray();
}
async function getAllData() {
  const data = await Users.find({}).select({__v: 0});
  return data;
  // const database = await getDatabase();
  // return await database.collection(collectionName).find({}).toArray();
}

async function deleteData(id){
  const deletedData = await Users.deleteOne({_id : id});
  return deletedData;
}

async function updateData(id, data){
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