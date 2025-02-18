const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : { type : String , required : true },
    author : { type : String , required : true },
    description : { type : String },
    publishedDate : { type : Date },
    genre : {type : String },
    filepath : {type : String , required : true},
    uploader : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt : {type : Date, default : Date.now }
})

module.exports = mongoose.model('Book',bookSchema);