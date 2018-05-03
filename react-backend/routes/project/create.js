import express from 'express';
import jwt from 'jsonwebtoken';
import firebase from 'firebase';
import { firebaseInstance } from '../../configs/database';

var ref = firebase.database().ref().child('projects');

const router = express.Router();

const decodeJWT = token => {
    return jwt.decode(token, process.env.JWT_SECRET);
}

router.post('/', (req, res) => {
    const { projectname, description } = req.body.data;
    const { projectid, createdBy } = req.body.addition;
    ref.child(projectid).once('value')
        .then( snapshot => {
            if(snapshot.val()){
                res.status(400).json({ errors: { global: "Project-id already taken!"} });
            }else{
                var uid = decodeJWT(createdBy).uid;
                console.log(uid);
                var projectObject = {
                    projectname: projectname,
                    description: description,
                    createdBy: uid,
                    users: {}
                }
                projectObject.users[uid] = { skills:"" };
                ref.child(projectid).set(projectObject);
                res.json({ project: { participants: [projectObject.users] }});
            }
        });
});

export default router;