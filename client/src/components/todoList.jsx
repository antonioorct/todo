import React, { useState, useEffect, useContext } from "react";
import {
  newTodo,
  deleteTodo,
  editTodo,
  getAllTodosFromUser,
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
    const todos = await getAllTodosFromUser(user.id);

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
    <div className="container">
      <div className="offset-2 col-8">
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              logout();
              setUser(initialState);
            }}
          >
            Logout
          </button>
        </div>
        <br />
        New todo
        <form className="input-group" onSubmit={(e) => handleSubmitTodoForm(e)}>
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={newTodoForm}
            onChange={({ target }) => setNewTodoForm(target.value)}
            autoFocus
          />

          <div className="input-group-append">
            <button className="btn btn-outline-success" type="submit">
              Submit
            </button>
          </div>
        </form>
        <br />
        <div className="row">
          <div className="col">
            Filter
            <br />
            <select
              className="custom-select"
              id="filter"
              value={filter}
              onChange={({ target }) => setFilter(target.value)}
            >
              <option value="none">None</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="col">
            Search
            <br />
            <input
              className="form-control"
              type="text"
              value={searchForm}
              onChange={({ target }) => setSearchForm(target.value)}
            />
          </div>
        </div>
        <br />
        <div className="card border-dark">
          <ul className="list-group list-group-flush">
            <div className="card-header text-center">
              <h2>TODOS</h2>
            </div>
            {todos
              .filter(
                (todo) =>
                  todo.description
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) &&
                  (filter === "none" ||
                    todo.completed === (filter !== "active"))
              )
              .map((todo, index) => (
                <li className="list-group-item border-dark" key={index}>
                  <div className="row d-flex align-items-center">
                    <input
                      className="col-1"
                      style={{ width: "40px", height: "40px" }}
                      type="checkbox"
                      name="completed"
                      onChange={() => handleChangeCompletedTodo(todo, index)}
                      checked={todo.completed}
                      disabled={user.id != todo.userId}
                    />
                    {editing === index ? (
                      <form
                        className="col-9 input-group"
                        onSubmit={(e) => handleSubmitEditTodoForm(e, todo)}
                      >
                        <input
                          className="form-control"
                          type="text"
                          value={todoForm}
                          onChange={({ target }) => setTodoForm(target.value)}
                        />

                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-success"
                            type="submit"
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={() => setEditing(-1)}
                          >
                            x
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="col-9">{todo.description}</div>
                    )}

                    {user.id == todo.userId && (
                      <div className="col text-center">
                        {editing !== index && (
                          <button
                            className="btn btn-primary btn-block"
                            onClick={() => {
                              setEditing(index);
                              setTodoForm(todo.description);
                            }}
                          >
                            Edit
                          </button>
                        )}

                        <button
                          className="btn btn-danger btn-block"
                          style={{ marginTop: "0" }}
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <hr />

                  <span>{new Date(todo.createdAt).toLocaleString()}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
