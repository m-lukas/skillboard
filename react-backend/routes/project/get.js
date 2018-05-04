import express from 'express';
import firebase from 'firebase';
import { firebaseInstance } from '../../configs/database';

var ref = firebaseInstance.database().ref();
var projectRef = ref.child('projects');
var userRef = ref.child('users');
const router = express.Router();

const asyncForEach = async (obj,callback) => {
  for(let index = 0; index < Object.keys(obj).length; index++){
    let key = Object.keys(obj)[index];
    await callback({key: key, data: obj[key]}, index, obj);
  }
}

router.post('/', (req, res) => {
  const { project } = req.body;
  var userList = [];

  projectRef.child(project.projectid).once('value').then(async projectData => {
    await asyncForEach(projectData.val().users, async (user) => {
      let keyNumber = 1;
      let userObject = {key: keyNumber};
      const userData = await userRef.child(user.key).once('value');
      Object.assign(userObject, user.data, userData.val());
      userList.push(userObject);
      keyNumber++;
    });
    res.json({ 
      project: { 
        projectid: projectData.val().projectid, 
        projectname: projectData.val().projectname, 
        description: projectData.val().description, 
        participants: userList, 
        createdBy: projectData.val().createdBy 
      }
    });
  });
});

export default router;