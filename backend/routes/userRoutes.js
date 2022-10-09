import express from "express";
import signin from "../controller/auth.js";
import {addTodo,getTodo} from '../controller/todo.js'

const router = express.Router();

router.post("/signin", signin);
router.get("/gettodo", getTodo);
router.post("/addtodo", addTodo);

export default router;
