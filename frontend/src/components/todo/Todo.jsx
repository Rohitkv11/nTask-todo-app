import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import "./todo.css";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

function Todo() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("AuthToken");
    if (!loggedInUser) {
      navigate("/");
    } else {
      navigate("/home");
      GetTodos();
      const user = jwt(loggedInUser);   //jwt decode
      setUser(user.user);
    }
  }, [todos, navigate]);

  //get todo
  const GetTodos = async () => {
    await axiosInstance.get("/api/user/gettodo").then((res) => {
      setTodos(res.data.todos);
    });
  };

  //completed todo
  const completeTodo = async (id) => {
    await axiosInstance.get("/api/user/complete/" + id).then((res) => {
      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id === res.data._id) {
            todo.complete = res.data.complete;
          }
          return todo;
        })
      );
    });
  };

  //add todo
  const addTodo = async () => {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/user/addtodo",
      data: {
        todo: newTodo,
      },
    });
    const data = response.data.text;

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
  };

  return (
    <div className="App">
      <h1>Welcome {user}</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={"todo" + (todo.complete ? " is-complete" : "  ")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Todo;
