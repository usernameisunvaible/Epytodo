const {get_user, connection} = require("./../utils/utils")
const bcrypt = require('bcryptjs');

const check_pass = async (req, res) =>
{
    try {
        let out = get_user(req, res)
        if (out != false) {
            if (bcrypt.compareSync(req.body.msg, out["password"])) {
                res.status(200)
                res.json({"msg": "true"})
            } else {
                res.status(400)
                res.json({"msg": "false"})
            }
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = check_pass;