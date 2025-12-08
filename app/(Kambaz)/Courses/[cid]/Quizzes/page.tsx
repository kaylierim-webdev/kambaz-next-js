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
import { IoRocketOutline } from "react-icons/io5";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, deleteQuiz as deleteQuizAction } from "./reducer";
import * as client from "../../client";
import { useEffect } from "react";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const courseQuizzes = quizzes || [];

  useEffect(() => {
    if (!cid) return;

    const fetchQuizzes = async () => {
      try {
        const results = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(results));
      } catch (err) {}
    };

    fetchQuizzes();
  }, [cid, dispatch]);

  const handleAddQuiz = () => {
    router.push(`/Courses/${cid}/Quizzes/new`);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;

    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await client.deleteQuiz(id);
        dispatch(deleteQuizAction(id));
      } catch (err) {}
    }
  };

  return (
    <div id="wd-quizzes">
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
              id="wd-add-quiz"
              onClick={handleAddQuiz}
            >
              <FaPlus className="me-2" />
              Quiz
            </Button>
          </Col>
        </Row>
      </div>

      <ListGroup>
        <ListGroupItem className="wd-quizzes-title p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary text-white d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              QUIZZES 10% of Total
            </div>
            <LessonControlButtons />
          </div>

          <ListGroup className="wd-quiz-list rounded-0">
            {courseQuizzes.map((quiz: any) => (
              <ListGroupItem
                key={quiz._id}
                className="wd-quiz-list-item p-3 d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center me-3 flex-grow-1">
                  <BsGripVertical className="me-2 fs-3" />
                  <IoRocketOutline className="text-primary me-2" />

                  <div className="flex-grow-1 d-flex flex-column">
                    <Link
                      href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="wd-quiz-link text-black fw-bold"
                    >
                      {quiz.title || "(Untitled Quiz)"}
                    </Link>

                    <span className="text-muted small">
                      Available: {quiz.availableDate || "N/A"} |{" "}
                      {quiz.points ?? "N/A"} pts
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(quiz._id)}
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