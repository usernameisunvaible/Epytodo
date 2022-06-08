const {get_user, connection} = require("./../utils/utils")

const delete_todo = (req, res) =>
{
    try {
        let out = get_user(req, res)

        if (out != false) {
            connection.query("SELECT * FROM todo WHERE id = '" + req.params.id + "';",
            function (err, results, fields)
            {
                if (results[0] != null) {
                    connection.query("DELETE FROM todo WHERE id = '" + req.params.id + "';")
                    res.status(200) //good
                    res.json({"msg" : "Successfully deleted record number: " + req.params.id})
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
module.exports = delete_todo;