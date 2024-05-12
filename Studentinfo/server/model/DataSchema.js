const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema(
{
  name: {type: String, required:true},
  email: {type: String, required:true},
  dob: {type: String, required:true},
  maths: {type: Number, required:true},
  chemistry: {type: Number, required:true},
  physics: {type: Number, required:true},
  cutoff: {type: Number, required:true},


 }, {timestamps:true})

const usercollection =  mongoose.model('Usersdetail', dataSchema);

module.exports = usercollection;  