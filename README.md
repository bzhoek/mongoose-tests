`node db/seed.js` fills `mongodb://localhost/testDatabase`

    npm install -g mocha
    npm init; npm install mongoose chai

    mocha
      Database Tests
        Test Database
          ✓ New name saved to test database (47ms)
          ✓ Dont save incorrect format to database
          ✓ Should retrieve data from test database

      3 passing (108ms)

HTTP tests http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai
