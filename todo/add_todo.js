const {get_user, connection} = require("../utils/utils")

const add_todo = async (req, res) =>
{
    try {
        let id = req.params.id
        let todo_dict = {"title" : "", "description" : "", "due_time" : "", "user_id" : "", "status" : "", "created_at" : ""}
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
            res.status(400)  //bad parameter
            res.json({
                "msg ": "Bad parameter"
                })
        } else {
            let out = get_user(req, res)

            if (out != false) {
                let date_ob = new Date();
                let date = (date_ob.getFullYear() + "-" + (("0" + date_ob.getMonth()).slice(-2)) + "-" + (("0" + date_ob.getDate()).slice(-2)) + " " + (("0" + date_ob.getHours()).slice(-2)) + ":" + (("0" + date_ob.getMinutes()).slice(-2)) + ":" + (("0" + date_ob.getSeconds()).slice(-2)))
                todo_dict["created_at"] = date
                connection.query("INSERT INTO todo SET title = '" + todo_dict["title"] + "', description = '" + todo_dict["description"] + "', due_time = '" + todo_dict["due_time"] + "', user_id = '" + todo_dict["user_id"] + "' ,created_at = '" + todo_dict["created_at"] + "' ,status = '" + todo_dict["status"] +"';")
                connection.query("SELECT * FROM todo WHERE title = '" + todo_dict["title"] + "' AND description = '" + todo_dict["description"] + "' AND due_time = '" + todo_dict["due_time"] + "' AND user_id = '" + todo_dict["user_id"] + "' AND created_at = '" + todo_dict["created_at"] + "' AND status = '" + todo_dict["status"] +"';", 
                function (err, results, fields)
                {
                    res.status(200)
                    res.json(results[0])
                });
            }
        }
    } catch {
        res.status(500)
        res.json({"msg": " Internal server error "})
    }
}
module.exports = add_todo;