"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import * as client from "../../../client";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (!qid) return;

    const fetchQuiz = async () => {
      try {
        const data = await client.findQuizzesForCourse(cid as string);
        const currentQuiz = data.find((q: any) => q._id === qid);
        setQuiz(currentQuiz);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuiz();
  }, [cid, qid]);

  if (!quiz) return <p>Loading...</p>;

  const handlePreview = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleEdit = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const handleStartQuiz = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/start`);
  };

  return (
    <div id="wd-quiz-details">
      <h2 className="mb-3">{quiz.title || "(Untitled Quiz)"}</h2>
      <p>{quiz.description}</p>

      <Card className="mb-4">
        <Card.Header>Quiz Properties</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <td>Quiz Type</td>
                <td>{quiz.quizType}</td>
              </tr>
              <tr>
                <td>Points</td>
                <td>{quiz.points}</td>
              </tr>
              <tr>
                <td>Assignment Group</td>
                <td>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <td>Shuffle Answers</td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Time Limit</td>
                <td>{quiz.timeLimit} minutes</td>
              </tr>
              <tr>
                <td>Multiple Attempts</td>
                <td>
                  {quiz.multipleAttempts
                    ? `Yes (${quiz.howManyAttempts})`
                    : "No"}
                </td>
              </tr>
              <tr>
                <td>Show Correct Answers</td>
                <td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Access Code</td>
                <td>{quiz.accessCode || "None"}</td>
              </tr>
              <tr>
                <td>One Question at a Time</td>
                <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Webcam Required</td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Lock Questions After Answering</td>
                <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>Available Date</td>
                <td>
                  {quiz.availableDate
                    ? new Date(quiz.availableDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Until Date</td>
                <td>
                  {quiz.untilDate
                    ? new Date(quiz.untilDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Due Date</td>
                <td>
                  {quiz.dueDate
                    ? new Date(quiz.dueDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </Table>

          <Row className="mt-3">
            {isFaculty ? (
              <>
                <Col xs="auto">
                  <Button variant="primary" onClick={handlePreview}>
                    Preview
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button variant="secondary" onClick={handleEdit}>
                    Edit
                  </Button>
                </Col>
              </>
            ) : (
              <Col xs="auto">
                <Button variant="success" onClick={handleStartQuiz}>
                  Start Quiz
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
