const Users = require('./model');

// function to insert data into db
async function insertData(data) {
  const receivedData = data.body;
  const insertedData = await Users.insertMany([receivedData]);
  return insertData;
}

// function to fetch all data from the db
async function getAllData() {
  const data = await Users.find({}).select({__v: 0});
  return data;
  // const database = await getDatabase();
  // return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  insertData,
  getAllData,
};