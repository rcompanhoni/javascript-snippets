const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   title: String
});

// since it will be used as a subdocument we simply export the schema
module.exports = PostSchema;