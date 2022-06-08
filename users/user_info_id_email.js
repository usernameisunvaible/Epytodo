const {get_user, connection} = require("./../utils/utils")

const user_info_id_email = async (req, res) =>
{
    try {
        let out = get_user(req, res)

        if (out != false) {
            connection.query("SELECT * FROM user WHERE id = '" + req.params.data + "';",
            function (err, results, fields)
            {
                if (results[0] != null) {
                    res.status(200) //valid
                    res.json(results[0])
                } else {
                    connection.query("SELECT * FROM user WHERE email = '" + req.params.data + "';",
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
            });
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = user_info_id_email;