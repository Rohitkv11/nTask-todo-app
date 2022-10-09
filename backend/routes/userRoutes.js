import express from "express";
import signin from "../controller/auth.js";
import { addTodo, getTodo, complete } from "../controller/todo.js";

const router = express.Router();
 
//routes
router.post("/signin", signin);
router.get("/gettodo", getTodo);
router.post("/addtodo", addTodo);
router.get("/complete/:id", complete);

export default router;
