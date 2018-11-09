const mongoose = require('mongoose');
const fs = require('fs');

let dictionaryHSK1;
fs.readFile(__dirname + '/dictionaryHSK1.json', (err, data) => {
  if (err) throw err;
  dictionaryHSK1 = JSON.parse(data);
  console.log(dictionaryHSK1);
});

mongoose.connect(
  'mongodb://lotust:dumbpassword@cluster0-shard-00-00-fykcj.mongodb.net:27017,cluster0-shard-00-01-fykcj.mongodb.net:27017,cluster0-shard-00-02-fykcj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
);

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  easy: [String],
  medium: [String],
  needsReview: [String],
  hard: [String],
});

const Users = mongoose.model('Users', usersSchema);
