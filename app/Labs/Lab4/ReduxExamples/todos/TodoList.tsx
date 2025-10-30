import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { Key } from "react";
export default function TodoList() {
  const { todos } = useSelector(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (state: any) => state.todosReducer
  );
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any, idx: Key) => (
          <TodoItem key={idx} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
