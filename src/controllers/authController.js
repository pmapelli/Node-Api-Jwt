const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { 
        expiresIn: 86400,
    });    
}

router.post('/authenticate', async (req, res) => {
    
    try {
        const { user, password } = req.body;

        if (user !== 'Numenu')
            return res.status(400).send({ error: 'Usuário não encontrado' })

        const hash = await bcrypt.hash('123123', 10);

        if (!await bcrypt.compare(password, hash))
            return res.status(400).send({ error: 'Senha incorreta'});
        
        return res.send({ 
            user, 
            token: generateToken({ hash }) ,
        });

    } catch (err) {
        return res.status(400).send({ error: 'Falha na autenticação' });
    }  
});

module.exports = app => app.use('/auth', router);