import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';
import firebase from 'firebase';
import { firebaseInstance } from '../../configs/database';
import dotenv from 'dotenv';

dotenv.config();

var ref = firebaseInstance.database().ref();
var projectRef = ref.child('projects');
var userRef = ref.child('users');

const router = express.Router();

const decodeJWT = token => {
    return jwt.decode(token, process.env.JWT_SECRET);
}

router.post('/', (req, res) => {
    const { token, first_name, last_name, skills, socialmedia } = req.body.user;
    const { projectid } = req.body.project;
    let uid = decodeJWT(token).uid;
    projectRef.child(id + '/users').orderByKey().equalTo(uid).once('value')
        .then( async snapshot => {
            if(snapshot.val()){
                res.status(400).json({ errors: { global: "Already joined!"} });
            }else{
                const projectDataRequest = await projectRef.child(projectid).once('value');
                const users = await userRef.child(uid).once('value');
                if(users){
                    let projectData = projectDataRequest.val();
                    projectRef.child('users/' + uid).set({ 
                        first_name: first_name, 
                        last_name: last_name, 
                        skills: skills, 
                        socialmedia: socialmedia 
                    });
                    res.json({ project: {
                         projectid: projectid, 
                         projectname: projectData.projectname, 
                         description: projectData.description, 
                         participants: [projectData.users], 
                         createdBy: projectData.createdBy 
                    }});
                }else{
                    //todo
                    res.status(400).json({ errors: { global: "FATAL ERROR!"} });
                }
            }
        });
    
});

export default router;