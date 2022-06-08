const {create_user, connection} = require("./../utils/utils")

var jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        let new_user = req.body
        let user_dict = {"id" : "", "email" : "", "password" : "", "created_at" : "", "firstname" : "", "name" : ""}
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
            connection.query("SELECT email FROM user WHERE email = '" + new_user.email + "';", 
            function(err, results, fields) {
                if (results[0] == null) {
                    let date_ob = new Date();
                    let date = (date_ob.getFullYear() + "-" + (("0" + date_ob.getMonth()).slice(-2)) + "-" + (("0" + date_ob.getDate()).slice(-2)) + " " + (("0" + date_ob.getHours()).slice(-2)) + ":" + (("0" + date_ob.getMinutes()).slice(-2)) + ":" + (("0" + date_ob.getSeconds()).slice(-2)))
                    user_dict["created_at"] = date
                    user_dict = create_user(user_dict, req, res)
                } else {
                    res.status(403)  //user already exist
                    res.json({"msg ": "Account already exists"})
                }
            }
            );
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = register;