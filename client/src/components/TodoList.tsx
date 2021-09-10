import React, { Fragment, useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import MarkComplete from "./MarkComplete";

enum todo_status {
  incomplete = "incomplete",
  complete = "complete",
}
export interface ITodo {
  todo_id: number;
  description: string;
  todo_status: todo_status;
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
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <MarkComplete todo={todo} />
                </td>
                <td>{/* <EditTodo todo={todo} /> */}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    //   onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
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
