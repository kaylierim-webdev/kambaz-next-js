/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Table, Alert, Container } from "react-bootstrap";
import * as client from "../../../client";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchData = async () => {
      if (!qid) return;

      try {
        const data = await client.findQuizzesForCourse(cid as string);
        const currentQuiz = data.find((q: any) => q._id === qid);
        setQuiz(currentQuiz);

        // Fetch latest attempt if student
        if (!isFaculty && currentUser?._id && currentQuiz) {
          try {
            const attempt = await client.getLatestAttempt(
              qid as string,
              currentUser._id
            );
            setLatestAttempt(attempt);
          } catch (err) {
            // No attempts yet
            console.log("No attempts found");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cid, qid, isFaculty, currentUser]);

  if (loading)
    return (
      <Container className="mt-4">
        <p>Loading...</p>
      </Container>
    );
  if (!quiz)
    return (
      <Container className="mt-4">
        <Alert variant="danger">Quiz not found</Alert>
      </Container>
    );

  const handlePreview = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleEdit = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const handleStartQuiz = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/take`);
  };

  const handleViewResults = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">{quiz.title || "(Untitled Quiz)"}</h2>
      <p className="text-muted">{quiz.description}</p>

      {!isFaculty && latestAttempt && (
        <Alert variant="info">
          <strong>Latest Score:</strong> {latestAttempt.score} / {quiz.points}{" "}
          points
          <br />
          <strong>Submitted:</strong>{" "}
          {new Date(latestAttempt.submittedAt).toLocaleString()}
          <Button
            variant="link"
            size="sm"
            onClick={handleViewResults}
            className="p-0 ms-2"
          >
            View Results
          </Button>
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Header>
          <strong>Quiz Properties</strong>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <td>
                  <strong>Quiz Type</strong>
                </td>
                <td>{quiz.quizType}</td>
              </tr>
              <tr>
                <td>
                  <strong>Points</strong>
                </td>
                <td>{quiz.points}</td>
              </tr>
              <tr>
                <td>
                  <strong>Assignment Group</strong>
                </td>
                <td>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <td>
                  <strong>Shuffle Answers</strong>
                </td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Time Limit</strong>
                </td>
                <td>{quiz.timeLimit} minutes</td>
              </tr>
              <tr>
                <td>
                  <strong>Multiple Attempts</strong>
                </td>
                <td>
                  {quiz.multipleAttempts
                    ? `Yes (${quiz.howManyAttempts || 1} attempts)`
                    : "No"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Show Correct Answers</strong>
                </td>
                <td>{quiz.showCorrectAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Access Code</strong>
                </td>
                <td>{quiz.accessCode || "None"}</td>
              </tr>
              <tr>
                <td>
                  <strong>One Question at a Time</strong>
                </td>
                <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Webcam Required</strong>
                </td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Lock Questions After Answering</strong>
                </td>
                <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Available Date</strong>
                </td>
                <td>
                  {quiz.availableDate
                    ? new Date(quiz.availableDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Until Date</strong>
                </td>
                <td>
                  {quiz.untilDate
                    ? new Date(quiz.untilDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Due Date</strong>
                </td>
                <td>
                  {quiz.dueDate
                    ? new Date(quiz.dueDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Number of Questions</strong>
                </td>
                <td>{quiz.questions?.length || 0}</td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex gap-2 mt-3">
            {isFaculty ? (
              <>
                <Button variant="primary" onClick={handlePreview}>
                  Preview
                </Button>
                <Button variant="secondary" onClick={handleEdit}>
                  Edit
                </Button>
              </>
            ) : (
              <Button variant="success" onClick={handleStartQuiz}>
                {latestAttempt ? "Retake Quiz" : "Start Quiz"}
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
