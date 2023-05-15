const { verify } = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/Usermodel');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const user = await User.findAll();
    res.json(user)
});

router.get('/me', verifyToken, async (req, res) =>{
    const user = await User.findOne({
        where: {
            id : req.user.userId
        }
    })
    res.json(user)
} )

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({
        where: {
            id: id
        }
    });
    res.json(user)
});


router.post('/', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const user = await User.create({
        name: name,
        username: username,
        password: password,
        role: role,
    });
    res.json(user)
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const user = await User.update({
        name: name,
        username: username,
        password: password,
        role: role,
    }, {
        where: {
            id: id
        }
    })
    res.json(user)
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.destroy({
        where: {
            id: id
        }
    });
    res.json(user)
});

module.exports = router;