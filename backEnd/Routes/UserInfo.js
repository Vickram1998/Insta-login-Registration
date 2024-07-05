const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const InstaUsers = require("../models/userdata")

router.get('/persons', async (req, res) => {
    try {
        const saveData = await InstaUsers.find();
        res.status(200).json(saveData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Register a new user
router.post('/register', async (req, res) => {

    const { name, userID, email, phone, gender, password } = req.body;

    bcrypt.hash(password, 10, async function(err, hash) {
        if(err){
            return res.status(500).json({
                success: "failed",
                message: err.message
            });
        }
        
        try {
                const Users = await InstaUsers.create({ 
                    userID,
                    name,
                    email,
                    phone,
                    gender, 
                    password: hash
                });
                res.status(200).json({
                    status: 'success',
                    message: 'registration success',
                    Users
                });
            } catch (error) {
                res.status(400).json({ message: error});
            }
        });
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { UserCredentail, password } = req.body;
        const user = await InstaUsers.find({ $or: [
            { userID: UserCredentail },
            { email: UserCredentail }
        ]});
        console.log(UserCredentail)
        if (user.length === 0) {
            return res.status(400).json({
                message: 'userID/Email not registered'
            });
        }
        
        const userPass = user[0].password;
        bcrypt.compare(password, userPass, function(err, result) {
            if (err) {
                return res.status(500).json({
                    status: 'failed',
                    message: err.message
                });
            }
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    user: user[0]._id
                }, 'Server');
                res.status(200).json({
                    status: 'Success',
                    token
                });
            } else {
                res.status(400).json({
                    status: 'failed',
                    message: 'incorrect password'
                });
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'failed',
            message: e.message
        });
    }
});

module.exports = router;
