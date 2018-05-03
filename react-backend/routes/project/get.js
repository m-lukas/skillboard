import express from 'express';
import firebase from 'firebase';
import { firebaseInstance } from '../../configs/database';

var ref = firebaseInstance.database().ref().child('projects');
const router = express.Router();

router.get('/:projectid', (req, res) => {

  var projectid = req.params.projectid;
  var userList = [];

  ref.child(projectid + "/users").once('value').then(function(snapshot){
    console.log(snapshot.val());
    snapshot.forEach(function(data) {

      var userObject = data.val();

      console.log(userObject);

      userObject.id = data.key;
      userList.push(userObject);

    });
    res.json(userList);
  });

});

export default router;