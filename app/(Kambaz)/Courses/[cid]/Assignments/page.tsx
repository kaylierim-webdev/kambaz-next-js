"use client";
import Link from "next/link";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { LuNotebookPen } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  const handleAddAssignment = () => {
    router.push(`/Courses/${cid}/Assignments/new`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(id));
    }
  };

  return (
    <div id="wd-assignments">
      <div className="flex mb-3">
        <Row className="align-items-center">
          <Col>
            <InputGroup>
              <InputGroupText>
                <FaMagnifyingGlass />
              </InputGroupText>
              <FormControl type="text" placeholder="Search..." />
            </InputGroup>
          </Col>
          <Col xs="auto" className="ms-auto">
            <Button
              variant="danger"
              size="lg"
              className="me-1 justify-end"
              id="wd-add-assignment"
              onClick={handleAddAssignment}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </Button>
          </Col>
        </Row>
      </div>

      <ListGroup>
        <ListGroupItem className="wd-assignments-title p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary text-white d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 40% of Total
            </div>
            <LessonControlButtons />
          </div>
          <ListGroup className="wd-assignment-list rounded-0">
            {courseAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment-list-item p-3 d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center me-3 flex-grow-1">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="text-success me-2" />
                  <div className="flex-grow-1 d-flex flex-column">
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-black fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <span className="text-muted small">
                      Due: {assignment.dueDate || "N/A"} | {assignment.points}{" "}
                      pts
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(assignment._id)}
                >
                  Delete
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
