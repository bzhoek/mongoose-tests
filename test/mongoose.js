"use strict";

// https://medium.com/nongaap/beginners-guide-to-writing-mongodb-mongoose-unit-tests-using-mocha-chai-ab5bdf3d3b1d

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chai = require('chai');
const expect = chai.expect;

const testSchema = new Schema({
  name: {type: String, required: true}
});
const Name = mongoose.model('Name', testSchema);

describe('Database Tests', () =>{
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', done);
  });

  describe('Test Database', () =>{
    it('New name saved to test database', done =>{
      const testName = Name({name: 'Mike'});

      testName.save(done);
    });

    it('Dont save incorrect format to database', done =>{
      const wrongSave = Name({
        notName: 'Not Mike'
      });
      wrongSave.save(err => {
        if (err) {
          return done();
        }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve data from test database', done =>{
      Name.find({name: 'Mike'}, (err, name) => {
        if (err) {
          throw err;
        }
        if (name.length === 0) {
          throw new Error('No data!');
        }
        done();
      });
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});