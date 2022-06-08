const express = require('express');

const router_user = express.Router()
router_user.get("/user/todos", require("./user_todos"));
router_user.post("/user/password", require("./check_password"));
router_user.get("/user", require("./user_info"));
router_user.get("/user/:data", require("./user_info_id_email"));
router_user.delete("/user/:data", require("./delete"));
router_user.put("/user/:data", require("./update_user"));

module.exports = router_user;