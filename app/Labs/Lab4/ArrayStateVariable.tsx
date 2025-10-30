import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function ArrayStateVariable() {
  const { todos } = useSelector(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (state: any) => state.todosReducer
  );
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
