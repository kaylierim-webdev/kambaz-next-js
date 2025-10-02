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

export default function Assignments() {
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
            <ListGroupItem className="wd-assignment-list-item p-3 d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="text-success" />
              </div>

              <div className="flex-grow-1 d-flex flex-column">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-black fw-bold"
                >
                  A1 - ENV + HTML
                </Link>
                <span className="text-muted small">
                  Multiple Modules | Not available until May 6 at 12:00am | Due
                  May 13 at 11:59pm | 100 pts
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-assignment-list-item p-3 d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="text-success" />
              </div>

              <div className="flex-grow-1 d-flex flex-column">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-black fw-bold"
                >
                  A2 - CSS + BOOTSTRAP
                </Link>
                <span className="text-muted small">
                  Multiple Modules | Not available until May 13 at 12:00am | Due
                  May 20 at 11:59pm | 100 pts
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-assignment-list-item p-3 d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="text-success" />
              </div>

              <div className="flex-grow-1 d-flex flex-column">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link text-black fw-bold"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <span className="text-muted small">
                  Multiple Modules | Not available until May 20 at 12:00am | Due
                  May 27 at 11:59pm | 100 pts
                </span>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
