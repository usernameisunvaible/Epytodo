const express = require('express');
const app = express()
var jwt = require('jsonwebtoken');
const route  = require("./auth")
const route_user = require("./users")
const route_todo = require("./todo")

app.use(express.json())
app.use("/", route)
app.use("/", route_user)
app.use("/", route_todo)
app.use(express.static('front'));

app.listen(8080, () => {
    console.log('Serveur à l écoute')
})


