const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('./config.js')
const app = express()

const user = require('./user.json')

app.set('llave', config.llave)
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000')
})

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/auth', (req, res) => {
    const matchPassword = bcrypt.compareSync(req.body.password, user.password)

    if (req.body.username === user.username && matchPassword) {
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440
        });
        res.status(200).json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.status(500).json({
            mensaje: "Usuario o contraseña incorrectos"
        })
    }
})