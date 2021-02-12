import React, { useState, useEffect, useContext } from "react";
import {
  getAllTodos,
  newTodo,
  deleteTodo,
  editTodo,
} from "../services/todoService";
import { UserContext, initialState } from "../services/userContext";
import { logout } from "../services/authService";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodoForm, setNewTodoForm] = useState("");
  const [editing, setEditing] = useState(-1);
  const [todoForm, setTodoForm] = useState("");
  const [searchForm, setSearchForm] = useState("");
  const [filter, setFilter] = useState("none");
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    populateTodoList();
  }, []);

  const populateTodoList = async () => {
    const todos = await getAllTodos();

    setTodos(todos);
  };

  const handleSubmitTodoForm = async (e) => {
    e.preventDefault();
    if (newTodoForm === "") return;

    const returnedTodo = await newTodo(newTodoForm, user.id);

    setTodos([returnedTodo, ...todos]);
    setNewTodoForm("");
  };

  const handleSubmitEditTodoForm = (e, todo) => {
    e.preventDefault();

    if (todoForm === "") return;

    editTodo({ description: todoForm }, todo.id);

    setEditing(-1);

    setTodos(
      todos.map((x) =>
        x.id === todo.id ? { ...todo, description: todoForm } : x
      )
    );
  };

  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId);

    setEditing(-1);

    setTodos(todos.filter((todo) => todoId !== todo.id));
  };

  const handleChangeCompletedTodo = (todo, index) => {
    editTodo({ completed: !todo.completed }, todo.id);

    if (filter !== "none" && index === editing) setEditing(-1);

    setTodos(
      todos.map((x) =>
        x.id === todo.id ? { ...todo, completed: !todo.completed } : x
      )
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          logout();
          setUser(initialState);
        }}
      >
        Logout
      </button>

      <form onSubmit={(e) => handleSubmitTodoForm(e)}>
        <input
          type="text"
          value={newTodoForm}
          onChange={({ target }) => setNewTodoForm(target.value)}
          autoFocus
        />

        <button type="submit">Submit</button>
      </form>

      <label>
        Filtering:
        <select
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        >
          <option value="none">None</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <input
        type="text"
        value={searchForm}
        onChange={({ target }) => setSearchForm(target.value)}
      />

      {todos
        .filter(
          (todo) =>
            todo.description.toLowerCase().includes(searchForm.toLowerCase()) &&
            (filter === "none" || todo.completed === (filter !== "active"))
        )
        .map((todo, index) => (
          <div key={index}>
            {editing === index ? (
              <div>
                <form onSubmit={(e) => handleSubmitEditTodoForm(e, todo)}>
                  <input
                    type="text"
                    value={todoForm}
                    onChange={({ target }) => setTodoForm(target.value)}
                  />
                </form>
                <button onClick={() => setEditing(-1)}>x</button>
              </div>
            ) : (
              <p>{todo.description}</p>
            )}
            <p>{new Date(todo.createdAt).toLocaleString()}</p>
            <label>
              <input
                type="checkbox"
                name="completed"
                onChange={() => handleChangeCompletedTodo(todo, index)}
                checked={todo.completed}
                disabled={user.id != todo.userId}
              />
              Completed
            </label>

            {user.id == todo.userId && (
              <div>
                <button
                  onClick={() => {
                    setEditing(index);
                    setTodoForm(todo.description);
                  }}
                >
                  Edit
                </button>

                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
