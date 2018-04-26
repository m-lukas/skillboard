import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');

dotenv.config();

const firebase = require('firebase').initializeApp({
    serviceAccount: './skillboard-service-account.json',
    databaseURL: process.env.FIREBASE_DB_URL
  }, "userDatabase");
var ref = firebase.database().ref().child('users');

const router = express.Router();

const isValidPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
}

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

router.post('/', (req, res) => {
    const { credentials } = req.body;
    ref.orderByChild('email').equalTo(credentials.email).once('value')
        .then( snapshot => {
            if(snapshot.val()){
                snapshot.forEach(function(data) {
                    if(isValidPassword(credentials.password, data.val().passwordHash)){
                        console.log("JA");
                        res.json({ user: toAuthJson(data.val().email) });
                    }else{
                        console.log("NEIN");
                        res.status(400).json({ errors: { global: "Incorrect email or password"} });
                    }
                });
            }else{
                console.log("NEIN");
                        res.status(400).json({ errors: { global: "Unknown email"} });
            }
        });
});

export default router;
