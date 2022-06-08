const {get_user, connection} = require("./../utils/utils")

const remove_user = async (req, res) =>
{
    try {
        let out = get_user(req, res)

        if (out != false) {
            connection.query("SELECT * FROM user WHERE id = '" + req.params.data + "';",
            function (err, results, fields)
            {
                if (results[0] != null) {
                    connection.query("DELETE FROM user WHERE id = '" + req.params.data + "';")
                    res.status(200) //valid
                    res.json({"msg" : " Successfully deleted record number : " + req.params.data})
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
module.exports = remove_user;