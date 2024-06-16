
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const app = express()
const port = 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})



app.listen(port, () => {
    console.log(`Running server on port ${port}`)
})