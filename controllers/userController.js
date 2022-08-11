const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { loginValidate, registerValidate } = require('./validate')

const userController = {

    // REGISTER FUNCTION

    register: async function (req, res) {

        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error) }

        const selectedUser = await User.findOne({ email: req.body.email })
            if(selectedUser) return res.status(400).send("E-mail já cadastrado")

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            
        })

        try {
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (error) {
            res.status(400).send(error)
        }

    },

    // LOGIN FUNCTION

    login: async function (req, res) {

        const { error } = loginValidate(req.body)
        if (error) { return res.status(400).send(error) }

        const selectedUser = await User.findOne({ email: req.body.email })
        if(!selectedUser) return res.status(400).send("E-mail ou senha incorretos :c")

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if (!passwordAndUserMatch) return res.status(400).send("E-mail ou senha incorretos :c")

        const token = jwt.sign({ _id: selectedUser.id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)
        
        res.header('token-autorizado', token)

        res.send("Usuario logado")

    },

}

module.exports = userController