import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';
import firebase from 'firebase';
import { firebaseInstance } from '../../configs/database';

var ref = firebase.database().ref().child('users');

const router = express.Router();

const generateJTW = (email) => {
    return jwt.sign({
        email: email
    }, process.env.JWT_SECRET);
}

const toAuthJson = (email) => {
    return{
        email: email,
        token: generateJTW(email)
    }
}

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

router.post('/', (req, res) => {
    const { email, password } = req.body.user;

    ref.orderByChild('email').equalTo(email).once('value')
        .then( snapshot => {
            if(snapshot.val()){
                res.status(400).json({ errors: { global: "Email already exists!"} });
            }else{
                var userObject = {
                    email: email,
                    passwordHash: encryptPassword(password)
                }

                ref.child(uniqid()).set(userObject);
                res.json({ user: toAuthJson(email) });
            }
        });

})

export default router;