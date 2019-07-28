const express = require('express');
// const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { 
        expiresIn: 86400,
    });    
}

// router.post('/register', async (req, res) => {
//     const { email } = req.body;
    
//     try {

//         console.log(email);

//         if ( await User.findOne( { email } )) {
//             return res.status(400).send({ error: 'User already exists' });
//         }

//         console.log(req.body);

//         const user = await User.create(req.body);

//         console.log(user);

//         user.password = undefined;        

//         return  res.send({ 
//             user, 
//             token: generateToken({ id: user.id }), 
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(400).send({ error: 'Registration failed' });
//     }   
// });

router.post('/authenticate', async (req, res) => {
    
    try {

        console.log('Log 1');

        const { user, password } = req.body;

        console.log('Log 2');
        console.log(user);
        // const  user = await User.findOne({ email }).select('+password');

        if (user !== 'Numenu')
            return res.status(400).send({ error: 'User not found' })

        // if (!user)
        //     return res.status(400).send({ error: 'User not found' })

        console.log('Log 3');

        const hash = await bcrypt.hash('123123', 10);
        
        console.log('Log 4');

        if (!await bcrypt.compare(password, hash))
            return res.status(400).send({ error: 'Invalid password'});
        
        console.log('Log 5');
        //  user.password = undefined;        

        const id = '5a291f40379ee1483f5600c1';

        return res.send({ 
            user, 
            token: generateToken({ id }) ,
        });

    } catch (err) {
        console.log(err);
    }  
});

module.exports = app => app.use('/auth', router);