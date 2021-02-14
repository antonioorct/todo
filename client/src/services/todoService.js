import http from "./httpService";

const getAllTodos = async () => {
  const { data } = await http.get("/todos");

  data.reverse();

  return data;
};

const getAllTodosFromUser = async (userId) => {
  const { data } = await http.get(`/users/${userId}/todos`);

  data.reverse();

  return data;
};

const newTodo = async (description, userId) => {
  const { data } = await http.post("/todos", {
    description,
    userId: userId,
  });

  return data;
};

const editTodo = async (newTodoData, todoId) => {
  const { data } = await http.patch("/todos/" + todoId, { ...newTodoData });

  return data;
};

const deleteTodo = async (todoId) => {
  http.delete("/todos/" + todoId);
};

export { getAllTodos, getAllTodosFromUser, newTodo, deleteTodo, editTodo };
