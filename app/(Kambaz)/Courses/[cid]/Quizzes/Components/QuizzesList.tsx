/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  ListGroup,
  Dropdown,
  Badge,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaBan,
  FaEllipsisV,
  FaPlus,
  FaRocket,
} from "react-icons/fa";
import * as client from "../../../client";
import {
  setQuizzes,
  deleteQuiz as deleteQuizAction,
  publishQuiz as publishQuizAction,
} from "../quizzesReducer";

export default function QuizzesList() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(data));
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  const handleAddQuiz = () => {
    router.push(`/Courses/${cid}/Quizzes/new/edit`);
  };

  const handleQuizClick = (quizId: string) => {
    router.push(`/Courses/${cid}/Quizzes/${quizId}`);
  };

  const handleEdit = (quizId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Courses/${cid}/Quizzes/${quizId}/edit`);
  };

  const handleDelete = async (quizId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuizAction(quizId));
      } catch (err) {
        console.error("Error deleting quiz:", err);
        alert("Failed to delete quiz");
      }
    }
  };

  const handlePublishToggle = async (quiz: any, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const newPublishedState = !quiz.published;
      await client.publishQuiz(quiz._id, newPublishedState);
      dispatch(
        publishQuizAction({ quizId: quiz._id, published: newPublishedState })
      );
    } catch (err) {
      console.error("Error toggling publish status:", err);
      alert("Failed to update publish status");
    }
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);

    if (now < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    } else if (now > untilDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  const getLatestScore = (quiz: any) => {
    // This would come from quiz attempts in a real implementation
    // For now, return null
    return null;
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <p>Loading quizzes...</p>
      </Container>
    );
  }

  // Filter quizzes: students only see published quizzes
  const displayedQuizzes = isFaculty
    ? quizzes
    : quizzes.filter((q: any) => q.published);

  return (
    <Container className="mt-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Quizzes</h2>
        </Col>
        {isFaculty && (
          <Col xs="auto">
            <Button variant="danger" onClick={handleAddQuiz}>
              <FaPlus className="me-2" />
              Quiz
            </Button>
          </Col>
        )}
      </Row>

      {displayedQuizzes.length === 0 ? (
        <div className="text-center p-5">
          <FaRocket size={60} className="text-muted mb-3" />
          <h4 className="text-muted">No Quizzes Yet</h4>
          {isFaculty ? (
            <p className="text-muted">
              Click the &quot;+ Quiz&quot; button to create your first quiz
            </p>
          ) : (
            <p className="text-muted">
              No quizzes are available for this course yet
            </p>
          )}
        </div>
      ) : (
        <ListGroup>
          {displayedQuizzes.map((quiz: any) => {
            const availabilityStatus = getAvailabilityStatus(quiz);
            const score = getLatestScore(quiz);

            return (
              <ListGroup.Item
                key={quiz._id}
                className="d-flex justify-content-between align-items-start cursor-pointer hover-shadow"
                onClick={() => handleQuizClick(quiz._id)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-start flex-grow-1">
                  {/* Publish Status Icon */}
                  <div
                    className="me-3 mt-1"
                    onClick={(e) => isFaculty && handlePublishToggle(quiz, e)}
                    style={{ cursor: isFaculty ? "pointer" : "default" }}
                  >
                    {quiz.published ? (
                      <FaCheckCircle
                        size={24}
                        className="text-success"
                        title="Published"
                      />
                    ) : (
                      <FaBan
                        size={24}
                        className="text-danger"
                        title="Unpublished"
                      />
                    )}
                  </div>

                  {/* Quiz Info */}
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{quiz.title || "(Untitled Quiz)"}</h5>
                    <div className="text-muted small">
                      <span className="me-3">
                        <strong>Availability:</strong> {availabilityStatus}
                      </span>
                      {quiz.dueDate && (
                        <span className="me-3">
                          <strong>Due:</strong>{" "}
                          {new Date(quiz.dueDate).toLocaleString()}
                        </span>
                      )}
                      <span className="me-3">
                        <strong>Points:</strong> {quiz.points}
                      </span>
                      <span className="me-3">
                        <strong>Questions:</strong>{" "}
                        {quiz.questions?.length || 0}
                      </span>
                      {!isFaculty && score !== null && (
                        <span>
                          <strong>Score:</strong> {score}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Context Menu (Faculty Only) */}
                {isFaculty && (
                  <Dropdown onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Toggle
                      variant="link"
                      className="text-dark p-0"
                      id={`dropdown-${quiz._id}`}
                    >
                      <FaEllipsisV />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={(e) => handleEdit(quiz._id, e)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={(e) => handleDelete(quiz._id, e)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => handlePublishToggle(quiz, e)}
                      >
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </Container>
  );
}
