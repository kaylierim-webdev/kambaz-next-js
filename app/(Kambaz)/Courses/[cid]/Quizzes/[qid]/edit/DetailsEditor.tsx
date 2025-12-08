/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Row, Col } from "react-bootstrap";

export default function DetailsEditor({ quiz, setQuiz }: any) {
  const update = (field: string, val: any) => {
    setQuiz({ ...quiz, [field]: val });
  };

  return (
    <Form className="mt-3">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={quiz.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={quiz.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select value={quiz.quizType} onChange={(e) => update("quizType", e.target.value)}>
              <option value="graded_quiz">Graded Quiz</option>
              <option value="practice_quiz">Practice Quiz</option>
              <option value="graded_survey">Graded Survey</option>
              <option value="ungraded_survey">Ungraded Survey</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select value={quiz.assignmentGroup} onChange={(e) => update("assignmentGroup", e.target.value)}>
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Check
        type="checkbox"
        label="Shuffle Answers"
        checked={quiz.shuffleAnswers}
        onChange={(e) => update("shuffleAnswers", e.target.checked)}
        className="mb-3"
      />

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Time Limit (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={quiz.timeLimitMinutes}
              onChange={(e) => update("timeLimitMinutes", parseInt(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Check
        type="checkbox"
        label="Multiple Attempts"
        checked={quiz.multipleAttempts}
        onChange={(e) => update("multipleAttempts", e.target.checked)}
        className="mb-3"
      />

      {quiz.multipleAttempts && (
        <Form.Group className="mb-3">
          <Form.Label>How Many Attempts</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={quiz.howManyAttempts}
            onChange={(e) => update("howManyAttempts", parseInt(e.target.value))}
          />
        </Form.Group>
      )}

      <Form.Check
        type="checkbox"
        label="Show Correct Answers"
        checked={quiz.showCorrectAnswers}
        onChange={(e) => update("showCorrectAnswers", e.target.checked)}
        className="mb-3"
      />

      <Form.Group className="mb-3">
        <Form.Label>Access Code (optional)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Leave blank for no code"
          value={quiz.accessCode}
          onChange={(e) => update("accessCode", e.target.value)}
        />
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="One Question at a Time"
        checked={quiz.oneQuestionAtATime}
        onChange={(e) => update("oneQuestionAtATime", e.target.checked)}
        className="mb-3"
      />

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="datetime-local"
              value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => update("availableDate", e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => update("dueDate", e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="datetime-local"
              value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => update("untilDate", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}