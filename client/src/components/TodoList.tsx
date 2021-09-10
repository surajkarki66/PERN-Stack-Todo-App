import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import MarkComplete from "./MarkComplete";
import EditTodo from "./EditTodo";

enum todo_status {
  incomplete = "incomplete",
  complete = "complete",
}
export interface ITodo {
  todo_id: number;
  description: string;
  todo_status: todo_status;
  created_at: Date;
  updated_at: Date;
  completed_at: Date;
}
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
    }
  };
  const deleteTodo = async (id: number) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      if (deleteTodo.ok) {
        setTodos(todos.filter((todo) => todo.todo_id !== id));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          {" "}
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Description</th>
              <th>Mark as complete</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>
                  <p
                    style={
                      todo.todo_status === "complete"
                        ? { textDecorationLine: "line-through" }
                        : {}
                    }
                  >
                    {" "}
                    {todo.description}
                  </p>
                </td>
                <td>
                  <MarkComplete todo={todo} />
                </td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{moment(todo.created_at).format("ll")}</td>
                <td>{moment(todo.updated_at).format("ll")}</td>
                <td>
                  {todo.completed_at
                    ? moment(todo.completed_at).format("ll")
                    : "NA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}{" "}
    </Fragment>
  );
};

export default TodoList;
