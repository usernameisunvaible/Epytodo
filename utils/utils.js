var jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const { json } = require('express/lib/response');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE
  });

const get_user_todos = (user, res) =>
{
    connection.query("SELECT * FROM todo WHERE user_id = '" + user["id"] + "';" , 
    function (err, results, fields)
    {
        res.status(200)  //valid
        res.json(results)
    });
}

const create_user = (infos, req, res) =>
{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(infos["password"], salt);
    infos["password"] = hash;
    connection.query("INSERT INTO user SET email = '" + infos["email"] + "', password = '" + infos["password"] + "', name = '" + infos["name"] + "', firstname = '" + infos["firstname"] + "' ,created_at = '" + infos["created_at"] + "';")
    connection.query("SELECT id FROM user WHERE email = '" + infos["email"] + "';",
    function (err, results, fields)
    {
        infos["id"] = results[0]["id"]
        let token = jwt.sign(infos, process.env.SECRET)
        res.status(201)  //valid
        res.json({ "token" : token})
    });
}

const verif_token = (token) =>
{
    try {
        let decoded = jwt.verify(token, process.env.SECRET);
        return decoded
    } catch {
        return false
    }
}

const get_token_from_req = (req) =>
{
    try {
        let header = req.headers
        let token = header["authorization"]
        token = token.replace("Bearer ", "")
        return token
    } catch {
        return false
    }
}

const get_user = (req, res) =>
{   
    let tok = get_token_from_req(req)
    if (tok == false) {
        res.status(401) // no token 
        res.json({"msg": "No token, authorization denied"})
        return false
    }
    let out = verif_token(tok)
    if (out != false) {
        let user_infos = {"id" : "", "email" : "", "password" : "", "created_at" : "", "firstname" : "", "name" : ""}
        user_infos["id"] = out["id"]
        user_infos["email"] = out["email"]
        user_infos["password"] = out["password"]
        user_infos["created_at"] = out["created_at"]
        user_infos["firstname"] = out["firstname"]
        user_infos["name"] = out["name"]
        return user_infos
    } else {
        res.status(401) // bad token 
        res.json({"msg": "Token is not valid"})
        return false
    }
}

module.exports = {create_user, get_user, get_user_todos, connection};