import Todo from "../model/todo.js";

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addTodo = async (req, res) => {
    console.log(req.body);
  try {
    const todo = new Todo({
      text:req.body.text,
    });
    await todo.save();

    return res.status(201).json({ created: true });
  } catch (error) {
    console.log(error); 
    return res.status(500).json(error);
  }
};

