const mysql = require('mysql2');
const {get_user, connection} = require("./../utils/utils")
const bcrypt = require('bcryptjs');

const update_user = async (req, res) =>
{
    try {
        let new_user = req.body
        let user_dict = {"email" : "", "password" : "", "firstname" : "", "name" : ""}
        let count = 0

        if (! new_user.email)
            ++count
        user_dict["email"] = new_user.email
        if (! new_user.password)
            ++count
        user_dict["password"] = new_user.password
        if (! new_user.name)
            ++count
        user_dict["name"] = new_user.name
        if (! new_user.firstname)
            ++count
        user_dict["firstname"] = new_user.firstname
        if (count != 0) {
            res.status(400)  //bad parameter
            res.json({"msg ": "Bad parameter"})
        } else {
            let out = get_user(req, res)
            if (out != false) {
                connection.query("SELECT * FROM user WHERE id = '" + req.params.data + "';",
                function (err, results, fields)
                {
                    if (results[0] != null) {
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(user_dict["password"], salt);
                        user_dict["password"] = hash
                        connection.query("UPDATE user SET email = '" + user_dict["email"] + "', password = '" + user_dict["password"] + "', name = '" + user_dict["name"] + "', firstname = '" + user_dict["firstname"] +"' WHERE id = '" + req.params.data + "';")
                        connection.query("SELECT * FROM user WHERE id = '" + req.params.data + "';",
                        function (err, results, fields)
                        {
                            res.status(200)  //ouip
                            res.json(results[0])
                        });
                    } else {
                        res.status(400)  //bad parameter
                        res.json({"msg ": "Bad parameter"})
                    }
                });
            }
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = update_user;