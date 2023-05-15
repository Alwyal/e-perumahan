const Users = require('../models/Usermodel');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const users = await Users.findOne({
        where: {
            username: username,
        },
    });
    if (users === null) {
        res.status(401).json({ message: 'Username Salah' });
    } else if (users.password === password) {
        const userId = users.id;
        const name = users.name;
        const username = users.username;
        const accessToken = jwt.sign({ 
            userId: userId,
            name: name,
            username: username
        }, 'secret', { expiresIn: '20s' });
        const refreshToken = jwt.sign({
            userId: userId,
            name: name,
            username: username
        },
        'secret',{ expiresIn : '1d' });

        await Users.update({
            refreshToken: refreshToken
        }, {
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });


    } else {
        res.status(401).json({ message: 'Password Salah' });
    }
});

router.get('/token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
        res.sendStatus(401);
        return;
    }
    
    const users = await Users.findOne({
        where: {
            refreshToken: refreshToken
        }
    });

    if (users === null) {
        res.sendStatus(403);
        return;
    }

    jwt.verify(refreshToken, 'secret', (err, user) => {
        if (err){
            res.sendStatus(403);
            return;
        }
        const accessToken = jwt.sign({
            userId: user.userId,
            name: user.name,
            username: user.username
        }, 'secret', { expiresIn: '20s' });
        res.json({ accessToken });
    });
});

router.delete('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken === null) {
        res.sendStatus(401);
    }

    const users = await Users.findOne({
        where: {
            refreshToken: refreshToken
        }
    });

    if (users === null) {
        res.sendStatus(403);
    }

    jwt.verify(refreshToken, 'secret', (err, user) => {
        if (err) return res.sendStatus(403);
        res.clearCookie('refreshToken');
        res.json({ message: 'Logout Berhasil' });
    });
});

module.exports = router;