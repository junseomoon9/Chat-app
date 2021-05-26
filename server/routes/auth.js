const router = require('express').Router()
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')

const {registerValidation, loginValidation} = require('../validation')

router.post('/signup', async (req, res) => {
    //Validate Info
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if username already exists
    const usernameExists = await User.findOne({username: req.body.username})
    if (usernameExists) return res.status(400).send('Username already exists')

    //Check if email already exists
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already exists')

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Add into database

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/login', async(req, res) => {
    //Validate the data
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if user exists
    const userExists = await User.findOne({username: req.body.username})
    if (!userExists) return res.status(400).send('Username or password invalid')

    const validPass = await bcrypt.compare(req.body.password, userExists.password)
    if (!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token
    //const token = jwt.sign({_id: userExists._id}, process.env.TOKEN_SECRET)
    //res.json({_id: userExists._id, name: userExists.name, token: token})

    res.send(userExists)
    
    
})

router.post('/finduser', async (req, res) => {
   
    const user = await User.findOne({_id: req.body._id})
    
    res.send({user: user})
})




module.exports = router;