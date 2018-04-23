const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const firebase = require('firebase').initializeApp({
  serviceAccount: './skillboard-service-account.json',
  databaseURL: 'https://skillboard-test.firebaseio.com/'
});

var ref = firebase.database().ref().child('users');

const app = express();
const port = process.env.PORT || 5000;

/*
var logger = function(req, res, next){
  console.log("Logging ...");
  next();
}

app.use(logger);
*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use(express.static(path.join(__dirname, 'public/html')));

var users = [
  {
    id: 1,
    first_name: "Lukas",
    last_name: "Müller",
    email: "mail@lukasmueller.de"
  },
  {
    id: 2,
    first_name: "Caro",
    last_name: "Renner",
    email: "mail@carorenner.de"
  },
  {
    id: 3,
    first_name: "Christoph",
    last_name: "Gräfe",
    email: "mail@christophgraefe.de"
  }
]

function getUsers(){

  

}

app.get('/users', (req, res) => {
  /*res.render('index', {
    title: 'Customers',
    users: users
  })*/
  var userList = [];

  ref.once('value').then(function(snapshot){
    snapshot.forEach(function(data) {

      var userObject = data.val();
      userObject.id = data.key;
      userList.push(userObject);

    });

    res.json(userList);

  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));