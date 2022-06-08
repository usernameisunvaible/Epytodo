const {get_user_todos, get_user} = require("../utils/utils")

const user_todos = async (req, res) =>
{
    try {
        let out = get_user(req, res)

        if (out != false) {
            get_user_todos(out, res)
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = user_todos;