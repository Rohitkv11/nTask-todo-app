import Todo from "../model/todo.js"; 

//get todos
export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//add todos
export const addTodo = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.todo,
    });
    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

//completed todos
export const complete = async (req, res) => {
  try {
    console.log("complete");
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
