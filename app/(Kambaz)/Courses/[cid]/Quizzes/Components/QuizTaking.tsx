/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Alert, Card, Form, Container, ProgressBar } from "react-bootstrap";
import * as client from "../client";
import { useSelector } from "react-redux";

export default function QuizTaking() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [attempts, setAttempts] = useState<any[]>([]);
  const [canTake, setCanTake] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await client.findQuizzesForCourse(cid as string);
        const q = data.find((q: any) => q._id === qid);
        setQuiz(q);

        if (currentUser?._id) {
          const atts = await client.getQuizAttempts(qid as string, currentUser._id);
          setAttempts(atts);
          
          if (q.multipleAttempts && atts.length >= (q.howManyAttempts || 1)) {
            setCanTake(false);
          }
        }

        // Check if access code is required
        if (q?.accessCode && !accessGranted) {
          setAccessGranted(false);
        } else if (!q?.accessCode) {
          setAccessGranted(true);
        }

        // Set time limit if enabled
        if (q?.timeLimit) {
          setTimeRemaining(q.timeLimit * 60); // Convert to seconds
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cid, qid, currentUser, accessGranted]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAccessCodeSubmit = () => {
    if (accessCode === quiz.accessCode) {
      setAccessGranted(true);
    } else {
      alert("Incorrect access code. Please try again.");
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (!currentUser?._id) {
      alert("You must be logged in to submit.");
      return;
    }

    if (window.confirm("Are you sure you want to submit your quiz?")) {
      try {
        const formattedAnswers = quiz.questions.map((q: any) => ({
          question: q._id,
          answer: answers[q._id] || null,
        }));

        await client.submitQuizAttempt(qid as string, currentUser._id, formattedAnswers);
        router.push(`/Courses/${cid}/Quizzes/${qid}/results`);
      } catch (err) {
        console.error(err);
        alert("Failed to submit quiz. Please try again.");
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) return <Container className="mt-4"><p>Loading...</p></Container>;
  if (!quiz) return <Container className="mt-4"><Alert variant="danger">Quiz not found</Alert></Container>;

  if (!canTake) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <h4>Maximum Attempts Reached</h4>
          <p>
            You have already used all {quiz.howManyAttempts || 1} attempts for
            this quiz.
          </p>
          <Button variant="secondary" onClick={() => router.back()}>
            Go Back
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!accessGranted && quiz.accessCode) {
    return (
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <h4>Access Code Required</h4>
          </Card.Header>
          <Card.Body>
            <p>This quiz requires an access code to begin.</p>
            <Form.Group className="mb-3">
              <Form.Label>Enter Access Code</Form.Label>
              <Form.Control
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Access code"
              />
            </Form.Group>
            <Button onClick={handleAccessCodeSubmit}>Submit</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const renderQuestion = (question: any, index: number) => {
    const currentAnswer = answers[question._id];

    return (
      <Card key={question._id} className="mb-3">
        <Card.Header>
          <h5>
            Question {index + 1} of {quiz.questions.length}
          </h5>
          <small className="text-muted">{question.points} points</small>
        </Card.Header>
        <Card.Body>
          <p className="mb-3">{question.question}</p>

          {question.type === "Multiple Choice" && (
            <Form>
              {question.choices.map((choice: any, i: number) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={`question-${question._id}`}
                  label={choice.text}
                  checked={currentAnswer === choice.text}
                  onChange={() => handleAnswerChange(question._id, choice.text)}
                />
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
                onChange={() => handleAnswerChange(question._id, true)}
              />
              <Form.Check
                type="radio"
                name={`question-${question._id}`}
                label="False"
                checked={currentAnswer === false}
                onChange={() => handleAnswerChange(question._id, false)}
              />
            </Form>
          )}

          {question.type === "Fill in the Blank" && (
            <Form.Group>
              <Form.Control
                type="text"
                value={currentAnswer || ""}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                placeholder="Type your answer here"
              />
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    );
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / quiz.questions.length) * 100;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        {timeRemaining !== null && (
          <Alert variant={timeRemaining < 60 ? "danger" : "info"} className="mb-0 py-2">
            <strong>Time Remaining:</strong> {formatTime(timeRemaining)}
          </Alert>
        )}
      </div>

      {attempts.length > 0 && (
        <Alert variant="info">
          Attempt {attempts.length + 1} of {quiz.howManyAttempts || 1}
        </Alert>
      )}

      <ProgressBar
        now={progress}
        label={`${answeredCount} / ${quiz.questions.length} answered`}
        className="mb-4"
      />

      {quiz.oneQuestionAtATime ? (
        <>
          {renderQuestion(quiz.questions[currentQuestionIndex], currentQuestionIndex)}
          <div className="d-flex justify-content-between mb-4">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          {quiz.questions.map((q: any, i: number) => renderQuestion(q, i))}
          <div className="text-center mb-4">
            <Button variant="success" size="lg" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
