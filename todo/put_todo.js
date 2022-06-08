const {get_user, connection} = require("../utils/utils")

const put_todo = (req, res) =>
{
    try {
        let id = req.params.id
        let todo_dict = {"title" : "", "description" : "", "due_time" : "", "user_id" : "", "status" : ""}
        let count = 0
        let request = req.body

        if (! request.title)
            ++count
        todo_dict["title"] = request.title
        if (! request.description)
            ++count
        todo_dict["description"] = request.description
        if (! request.due_time)
            ++count
        todo_dict["due_time"] = request.due_time
        if (! request.user_id)
            ++count
        todo_dict["user_id"] = request.user_id
        if (!request.status)
            ++count
        todo_dict["status"] = request.status
        if (count != 0) {
            res.status(200)  //bad parameter
            res.json({
                "msg ": "Bad parameter"
                })
        } else {
            let out = get_user(req, res)

            if (out != false) {
                connection.query("SELECT * FROM todo WHERE id = '" + req.params.id + "';", 
                function (err, results, fields)
                {
                    if (results[0] != null) {
                        connection.query("UPDATE todo SET title = '" + todo_dict["title"] + "', description = '" + todo_dict["description"] + "', due_time = '" + todo_dict["due_time"] + "', user_id = '" + todo_dict["user_id"] + "' ,status = '" + todo_dict["status"] +"' WHERE id = '" + req.params.id + "';");
                        res.status(200);
                        res.json(todo_dict)
                    }
                });
            }
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = put_todo;