/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Container, Alert } from "react-bootstrap";
import * as client from "../client";
import { FaEdit } from "react-icons/fa";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await client.findQuizzesForCourse(cid as string);
        const q = data.find((q: any) => q._id === qid);
        setQuiz(q);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cid, qid]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const gradeQuiz = () => {
    let totalScore = 0;

    quiz.questions.forEach((question: any) => {
      const userAnswer = answers[question._id];
      let isCorrect = false;

      if (question.type === "Multiple Choice") {
        const correctChoice = question.choices.find((c: any) => c.isCorrect);
        isCorrect = userAnswer === correctChoice?.text;
      } else if (question.type === "True/False") {
        isCorrect = userAnswer === question.answer;
      } else if (question.type === "Fill in the Blank") {
        isCorrect = question.blanks.some(
          (blank: string) =>
            blank.toLowerCase() === (userAnswer || "").toLowerCase()
        );
      }

      if (isCorrect) {
        totalScore += question.points;
      }
    });

    setScore(totalScore);
    setShowResults(true);
  };

  const handleEdit = () => {
    router.push(`/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const resetPreview = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isQuestionCorrect = (question: any) => {
    const userAnswer = answers[question._id];

    if (question.type === "Multiple Choice") {
      const correctChoice = question.choices.find((c: any) => c.isCorrect);
      return userAnswer === correctChoice?.text;
    } else if (question.type === "True/False") {
      return userAnswer === question.answer;
    } else if (question.type === "Fill in the Blank") {
      return question.blanks.some(
        (blank: string) =>
          blank.toLowerCase() === (userAnswer || "").toLowerCase()
      );
    }
    return false;
  };

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!quiz) return <Container className="mt-4"><Alert variant="danger">Quiz not found</Alert></Container>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>{quiz.title} - Preview</h2>
          <Alert variant="info" className="mb-0 mt-2">
            This is a preview of the quiz. Your answers will not be saved.
          </Alert>
        </div>
        <Button variant="secondary" onClick={handleEdit}>
          <FaEdit className="me-2" />
          Edit Quiz
        </Button>
      </div>

      {showResults && (
        <Alert variant="success" className="mt-3">
          <h4>Preview Results</h4>
          <p>
            <strong>Score:</strong> {score} / {quiz.points} points (
            {Math.round((score / quiz.points) * 100)}%)
          </p>
          <Button variant="primary" size="sm" onClick={resetPreview}>
            Try Again
          </Button>
        </Alert>
      )}

      {quiz.questions.map((question: any, index: number) => {
        const currentAnswer = answers[question._id];
        const isCorrect = showResults ? isQuestionCorrect(question) : null;

        return (
          <Card
            key={question._id}
            className="mb-3"
            border={
              isCorrect === true
                ? "success"
                : isCorrect === false
                ? "danger"
                : undefined
            }
          >
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Question {index + 1}: {question.title}
                </h5>
                <div>
                  <small className="text-muted">{question.points} points</small>
                  {showResults && (
                    <span className="ms-2">
                      {isCorrect ? (
                        <span className="text-success">✓ Correct</span>
                      ) : (
                        <span className="text-danger">✗ Incorrect</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <p className="mb-3">{question.question}</p>

              {question.type === "Multiple Choice" && (
                <Form>
                  {question.choices.map((choice: any, i: number) => (
                    <div key={i} className="mb-2">
                      <Form.Check
                        type="radio"
                        name={`question-${question._id}`}
                        label={choice.text}
                        checked={currentAnswer === choice.text}
                        onChange={() =>
                          !showResults &&
                          handleAnswerChange(question._id, choice.text)
                        }
                        disabled={showResults}
                      />
                      {showResults && choice.isCorrect && (
                        <small className="text-success ms-4">
                          ✓ Correct answer
                        </small>
                      )}
                    </div>
                  ))}
                </Form>
              )}

              {question.type === "True/False" && (
                <Form>
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="True"
                    checked={currentAnswer === true}
                    onChange={() =>
                      !showResults && handleAnswerChange(question._id, true)
                    }
                    disabled={showResults}
                  />
                  <Form.Check
                    type="radio"
                    name={`question-${question._id}`}
                    label="False"
                    checked={currentAnswer === false}
                    onChange={() =>
                      !showResults && handleAnswerChange(question._id, false)
                    }
                    disabled={showResults}
                  />
                  {showResults && (
                    <small className="text-success mt-2 d-block">
                      ✓ Correct answer: {question.answer ? "True" : "False"}
                    </small>
                  )}
                </Form>
              )}

              {question.type === "Fill in the Blank" && (
                <>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={currentAnswer || ""}
                      onChange={(e) =>
                        !showResults &&
                        handleAnswerChange(question._id, e.target.value)
                      }
                      placeholder="Type your answer here"
                      disabled={showResults}
                    />
                  </Form.Group>
                  {showResults && (
                    <small className="text-success mt-2 d-block">
                      ✓ Acceptable answers: {question.blanks.join(", ")}
                    </small>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        );
      })}

      {!showResults && (
        <div className="text-center mb-4">
          <Button variant="success" size="lg" onClick={gradeQuiz}>
            Submit Preview
          </Button>
        </div>
      )}
    </Container>
  );
}
