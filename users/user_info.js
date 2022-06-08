const {get_user} = require("./../utils/utils")

const user_info = async (req, res) =>
{
    try {
        let out = get_user(req, res)

        if (out != false) {
            res.status(200)  //valid
            res.json(out)
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = user_info;