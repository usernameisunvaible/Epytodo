const {get_user, connection} = require("../utils/utils")

const todo_all = async (req, res) =>
{
    try {
        let out = get_user(req, res)

        if (out != false) {
            connection.query("SELECT * FROM todo", 
            function (err, results, fields)
            {
                res.status(200) //valid
                res.json(results)
            });

        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = todo_all;
