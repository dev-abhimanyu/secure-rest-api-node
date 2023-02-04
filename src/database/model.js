const mongoose = require('mongoose');
const schema = mongoose.Schema({
    firstName: {
        type: String
    },
	lastName: {
        type: String
    },
	email: {
        type: String
    },
	password: {
        type: String
    },
	permissionLevel: {
        type: Number
    }
});
const Users = mongoose.model('Users', schema);
module.exports = Users;