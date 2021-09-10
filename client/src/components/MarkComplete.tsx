import React from "react";
import { ITodo } from "./TodoList";

export interface IProps {
  todo: ITodo;
}
const MarkComplete: React.FC<IProps> = (props) => {
  const { todo } = props;
  const checkedTodo = async (todo_id: number, checked: boolean) => {
    let body = { todo_status: "incomplete" };
    if (checked) {
      body = { todo_status: "complete" };
    }
    try {
      const response = await fetch(
        `http://localhost:5000/markTodo/${todo_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (err) {}
  };
  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    await checkedTodo(todo.todo_id, checked);
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={handleCheck}
        defaultChecked={todo.todo_status === "complete" ? true : false}
      />
    </>
  );
};

export default MarkComplete;
