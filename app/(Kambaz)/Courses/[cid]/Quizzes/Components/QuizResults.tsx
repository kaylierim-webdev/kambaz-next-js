/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Card, Alert, Button, Badge } from "react-bootstrap";
import * as client from "../../../client";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const load = async () => {
      try {
        const quizData = await client.findQuizzesForCourse(cid as string);
        const q = quizData.find((q: any) => q._id === qid);
        setQuiz(q);

        if (currentUser?._id) {
          const latestAttempt = await client.getLatestAttempt(
          qid as string,
          currentUser._id
          );
          setAttempt(latestAttempt);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cid, qid, currentUser]);

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!quiz || !attempt) {
    return (
      <Container className="mt-4">
        <Alert variant="info">
          No quiz results found. Please take the quiz first.
        </Alert>
        <Button onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
          Back to Quiz
        </Button>
      </Container>
    );
  }

  const percentage = Math.round((attempt.score / quiz.points) * 100);

  const getQuestionById = (questionId: string) => {
    return quiz.questions.find((q: any) => q._id === questionId);
  };

  const getCorrectAnswer = (question: any) => {
    if (question.type === "Multiple Choice") {
      const correct = question.choices.find((c: any) => c.isCorrect);
      return correct?.text || "N/A";
    } else if (question.type === "True/False") {
      return question.answer ? "True" : "False";
    } else if (question.type === "Fill in the Blank") {
      return question.blanks.join(" or ");
    }
    return "N/A";
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Quiz Results: {quiz.title}</h2>

      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Your Score</h4>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <h1 className="display-3 mb-3">
              {attempt.score} / {quiz.points}
            </h1>
            <h3 className={percentage >= 70 ? "text-success" : "text-danger"}>
              {percentage}%
            </h3>
            <p className="text-muted">
              Submitted: {new Date(attempt.submittedAt).toLocaleString()}
            </p>
            <p className="text-muted">
              Attempt {attempt.attemptNumber} of {quiz.howManyAttempts || 1}
            </p>
          </div>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Question Review</h4>

      {attempt.answers.map((ans: any, index: number) => {
        const question = getQuestionById(ans.question);
        if (!question) return null;

        return (
          <Card
            key={ans.question}
            className="mb-3"
            border={ans.correct ? "success" : "danger"}
          >
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Question {index + 1}: {question.title}
                </h5>
                <div>
                  {ans.correct ? (
                    <Badge bg="success" className="me-2">
                      <FaCheckCircle className="me-1" />
                      Correct ({ans.pointsEarned} pts)
                    </Badge>
                  ) : (
                    <Badge bg="danger" className="me-2">
                      <FaTimesCircle className="me-1" />
                      Incorrect (0 pts)
                    </Badge>
                  )}
                  <small className="text-muted">
                    {question.points} points possible
                  </small>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <p className="mb-3">
                <strong>Question:</strong> {question.question}
              </p>

              <div className="mb-2">
                <strong>Your Answer:</strong>{" "}
                <span className={ans.correct ? "text-success" : "text-danger"}>
                  {ans.answer !== null && ans.answer !== undefined
                    ? String(ans.answer)
                    : "(No answer provided)"}
                </span>
              </div>

              {!ans.correct && quiz.showCorrectAnswers && (
                <div>
                  <strong>Correct Answer:</strong>{" "}
                  <span className="text-success">
                    {getCorrectAnswer(question)}
                  </span>
                </div>
              )}

              {question.type === "Multiple Choice" && quiz.showCorrectAnswers && (
                <div className="mt-3">
                  <small className="text-muted">All choices:</small>
                  <ul className="mt-2">
                    {question.choices.map((choice: any, i: number) => (
                      <li
                        key={i}
                        className={choice.isCorrect ? "text-success" : ""}
                      >
                        {choice.text}
                        {choice.isCorrect && " ✓"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}

      <div className="d-flex gap-2 mb-4">
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
        >
          Back to Quiz
        </Button>
        {quiz.multipleAttempts &&
          attempt.attemptNumber < (quiz.howManyAttempts || 1) && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(`/Courses/${cid}/Quizzes/${qid}/take`)
              }
            >
              Retake Quiz
            </Button>
          )}
        <Button
          variant="outline-primary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          All Quizzes
        </Button>
      </div>
    </Container>
  );
}
