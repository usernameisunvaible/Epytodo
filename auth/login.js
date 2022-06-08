var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {connection} = require("./../utils/utils")

const login = async (req, res) => {
    try {
        let new_user = req.body
        let count = 0

        if (! new_user.email)
            ++count
        if (! new_user.password)
            ++count

        if (count != 0) {
            res.status(400)  //bad parameter
            res.json({"msg ": "Bad parameter"})
        } else {
            connection.query("SELECT * FROM user WHERE email = '" + new_user.email + "';", 
            function(err, results, fields) {
                for (let i = 0; i < results.length; ++i) {
                    if (bcrypt.compareSync(new_user.password, results[i]["password"])) {
                        res.status(200)  //user exist and is that one
                        let token = jwt.sign(results[i], process.env.SECRET)
                        res.json({ "token" : token})
                        return 0
                    }
                }
                res.status(403)  //bad user
                res.json({"msg": "Not found"})
            });
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = login;