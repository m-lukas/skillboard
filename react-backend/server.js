const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const firebase = require('firebase').initializeApp({
  serviceAccount: './skillboard-service-account.json',
  databaseURL: 'https://skillboard-test.firebaseio.com/'
});

var ref = firebase.database().ref().child('projects');

const app = express();
const port = process.env.PORT || 5000;

/* EXPRESS CRASH COURSE
var logger = function(req, res, next){
  console.log("Logging ...");
  next();
}

app.use(logger);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public/html')));*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/auth', (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials" }});
});

app.get('/projects/:projectid', (req, res) => {

  var projectid = "" + req.params.projectid;
  var userList = [];

  ref.child(projectid + "/users").once('value').then(function(snapshot){
    snapshot.forEach(function(data) {

      var userObject = data.val();
      userObject.id = data.key;
      userList.push(userObject);

    });

    res.json(userList);

  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));