import express from 'express';
const firebase = require('firebase').initializeApp({
    serviceAccount: './skillboard-service-account.json',
    databaseURL: 'https://skillboard-test.firebaseio.com/'
  }, "userDatabase");

const router = express.Router();

var ref = firebase.database().ref().child('users');

const findUser = (email) => {
  ref.orderByChild('email').equalTo(email).once('value', (snap) => {
        return snap.val();
  });
}

router.post('/', (req, res) => {
    const { credentials } = req.body;
    ref.orderByChild('email').equalTo(credentials.email).once('value')
        .then( snapshot => {
            console.log(snapshot.val());
            if(snapshot.val()){
                console.log("JA");
                res.json({ success: true });
            }else{
                console.log("NEIN");
                res.status(400).json({ errors: { global: "Incorrect email or password"} });
            }
        });
});

export default router;
