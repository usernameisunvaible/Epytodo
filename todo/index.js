const express = require('express');

const router_todo = express.Router()
router_todo.get("/todos", require("./todo_all"));
router_todo.get("/todos/:id", require("./todo_id"));
router_todo.post("/todos", require("./add_todo"));
router_todo.put("/todos/:id", require("./put_todo"));
router_todo.delete("/todos/:id", require("./delete_todo"));
module.exports = router_todo;