const express = require('express');
const router = express.Router();
const auth = require('../controllers/todo.controller')
const authenticationMiddleware = require('../middleware/Auth.middleware');

// route for create-repo
router.post("/create-todo-list", authenticationMiddleware, auth.createRepository);

// route for update-status
router.patch("/update-todo-list-status", authenticationMiddleware, auth.updateRepository);

// route for update-todo
router.patch("/update-todo-list", authenticationMiddleware, auth.updateTodo);

// route for showing-all-repo
router.get("/show-todo-list", authenticationMiddleware, auth.showRepository);

// route for showing specific user repo
// router.get("/show-repository/user", authenticationMiddleware, auth.showSpecificRepository);

// route for delete-repo
router.delete("/delete-todo-list/:id", authenticationMiddleware, auth.deleteRepository);

module.exports = router;
