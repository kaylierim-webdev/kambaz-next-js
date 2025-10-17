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
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  const courseAssignments = assignments.filter((a) => a.course === cid);
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
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="me-1 justify-end"
              id="wd-add-assignment-group"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Group
            </Button>
          </Col>
        </Row>
      </div>
      <ListGroup>
        <ListGroupItem className="wd-assignments-title p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 40% of Total
            <LessonControlButtons />
          </div>
          <ListGroup className="wd-assignment-list rounded-0">
            {courseAssignments.map((assignment) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-assignment-list-item p-3 d-flex align-items-center"
              >
                <div className="d-flex align-items-center me-3">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookPen className="text-success" />
                </div>

                <div className="flex-grow-1 d-flex flex-column">
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-black fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <span className="text-muted small">
                    Multiple Modules | Due soon | 100 pts
                  </span>
                </div>

                <LessonControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
