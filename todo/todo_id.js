const {connection, get_user} = require("../utils/utils")

const todo_id = async (req, res) =>
{
    try {
        let out = get_user(req, res)

        if (out != false) {
            connection.query("SELECT * FROM todo WHERE id = '" + req.params.id + "';", 
            function (err, results, fields)
            {
                if (results[0] != null) {
                    res.status(200) //valid
                    res.json(results[0])
                } else {
                    res.status(400)  //bad parameter
                    res.json({"msg ": "Bad parameter"})
                }
                
            });
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = todo_id;
