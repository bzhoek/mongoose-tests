const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: {type: String, required: true}
});
const Name = mongoose.model('Name', testSchema);

mongoose.connect('mongodb://localhost/testDatabase');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log("Mongoose connection opened."))

const promises = [];

["Jack", "Jill", "John", "Jenny"].forEach((name) => {
  promises.push(new Promise((accept, reject) => {
    Name({name: name}).save((err) => {
      err ? reject(err) : accept();
    });
  }));
});

Name.find().exec((err, name) => {
  console.log(name);
});

Promise.all(promises).then(() => {
  db.close(() => {
    console.log('Mongoose connection closed.');
  });
});