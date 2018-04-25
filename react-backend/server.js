const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const firebase = require('firebase').initializeApp({
  serviceAccount: './skillboard-service-account.json',
  databaseURL: 'https://skillboard-test.firebaseio.com/'
});

import auth from './routes/auth';

var ref = firebase.database().ref();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/auth', auth);

app.post('/api/auth', (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" }});
});

app.get('/projects/:projectid', (req, res) => {

  var projectid = "" + req.params.projectid;
  var userList = [];

  ref.child("projects" + projectid + "/users").once('value').then(function(snapshot){
    snapshot.forEach(function(data) {

      var userObject = data.val();
      userObject.id = data.key;
      userList.push(userObject);

    });

    res.json(userList);

  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports.ref = ref;