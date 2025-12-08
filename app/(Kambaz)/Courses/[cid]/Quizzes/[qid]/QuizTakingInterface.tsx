"use client";
import { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface QuizTakingInterfaceProps {
  quiz: any;
  isPreview?: boolean;
  onSubmit?: (answers: any[], score: number) => void;
}

export default function QuizTakingInterface({
  quiz,
  isPreview = false,
  onSubmit,
}: QuizTakingInterfaceProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    const answerArray: any[] = [];

    quiz.questions.forEach((q: any) => {
      const userAnswer = answers[q._id];
      let isCorrect = false;

      if (q.type === "multiple_choice") {
        const correctChoice = q.choices.find((c: any) => c.correct);
        isCorrect = userAnswer === correctChoice?._id;
      } else if (q.type === "true_false") {
        isCorrect = userAnswer === q.answerIsTrue;
      } else if (q.type === "fill_blank") {
        isCorrect = q.answers?.some(
          (a: string) => a.toLowerCase().trim() === userAnswer?.toLowerCase().trim()
        );
      }

      if (isCorrect) calculatedScore += q.points || 0;
      
      answerArray.push({
        questionId: q._id,
        answer: userAnswer,
      });
    });

    return { score: calculatedScore, answers: answerArray };
  };

  const handleSubmit = async () => {
    const { score: finalScore, answers: answerArray } = calculateScore();
    setScore(finalScore);
    setSubmitted(true);

    if (onSubmit) {
      onSubmit(answerArray, finalScore);
    }
  };

  if (submitted) {
    return (
      <div className="p-3">
        <Card className="text-center">
          <Card.Body>
            <h2>Quiz Submitted!</h2>
            <h3 className="my-4">
              Your Score: {score} / {quiz.points}
            </h3>
            <h4>
              Percentage: {((score / quiz.points) * 100).toFixed(1)}%
            </h4>
            {isPreview && (
              <Alert variant="info" className="mt-3">
                This was a preview. Your answers were not saved.
              </Alert>
            )}
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => router.back()}
            >
              Back to Quizzes
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h2>{quiz.title}</h2>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      <div className="mb-3">
        <strong>Total Points:</strong> {quiz.points}
      </div>

      {quiz.questions?.map((question: any, index: number) => (
        <Card key={question._id} className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <h5>Question {index + 1}</h5>
              <span className="badge bg-secondary">{question.points} pts</span>
            </div>
            <p className="mt-2">{question.question}</p>

            {/* Multiple Choice */}
            {question.type === "multiple_choice" && (
              <Form>
                {question.choices?.map((choice: any) => (
                  <Form.Check
                    key={choice._id}
                    type="radio"
                    id={`${question._id}-${choice._id}`}
                    name={`question-${question._id}`}
                    label={choice.text}
                    value={choice._id}
                    onChange={() => handleAnswerChange(question._id, choice._id)}
                  />
                ))}
              </Form>
            )}

            {/* True/False */}
            {question.type === "true_false" && (
              <Form>
                <Form.Check
                  type="radio"
                  id={`${question._id}-true`}
                  name={`question-${question._id}`}
                  label="True"
                  onChange={() => handleAnswerChange(question._id, true)}
                />
                <Form.Check
                  type="radio"
                  id={`${question._id}-false`}
                  name={`question-${question._id}`}
                  label="False"
                  onChange={() => handleAnswerChange(question._id, false)}
                />
              </Form>
            )}

            {/* Fill in the Blank */}
            {question.type === "fill_blank" && (
              <Form.Control
                type="text"
                placeholder="Type your answer here..."
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              />
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}