const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Contact
let Contact = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  age: {
    type: Number
  }
},{
    collection: 'contact'
});

module.exports = mongoose.model('Contact', Contact);