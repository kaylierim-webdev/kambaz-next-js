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
          placeholder="Enter quiz title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={quiz.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Enter quiz description"
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => update("quizType", e.target.value)}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => update("assignmentGroup", e.target.value)}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Shuffle Answers"
          checked={quiz.shuffleAnswers}
          onChange={(e) => update("shuffleAnswers", e.target.checked)}
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Time Limit (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={quiz.timeLimit}
              onChange={(e) =>
                update("timeLimit", parseInt(e.target.value) || 0)
              }
              min="0"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => update("multipleAttempts", e.target.checked)}
              className="mt-4"
            />
          </Form.Group>
        </Col>
      </Row>

      {quiz.multipleAttempts && (
        <Form.Group className="mb-3">
          <Form.Label>How Many Attempts</Form.Label>
          <Form.Control
            type="number"
            value={quiz.howManyAttempts || 1}
            onChange={(e) =>
              update("howManyAttempts", parseInt(e.target.value) || 1)
            }
            min="1"
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Show Correct Answers"
          checked={quiz.showCorrectAnswers}
          onChange={(e) => update("showCorrectAnswers", e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Access Code (optional)</Form.Label>
        <Form.Control
          type="text"
          value={quiz.accessCode}
          onChange={(e) => update("accessCode", e.target.value)}
          placeholder="Leave blank for no access code"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="One Question at a Time"
          checked={quiz.oneQuestionAtATime}
          onChange={(e) => update("oneQuestionAtATime", e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Webcam Required"
          checked={quiz.webcamRequired}
          onChange={(e) => update("webcamRequired", e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Lock Questions After Answering"
          checked={quiz.lockQuestionsAfterAnswering}
          onChange={(e) =>
            update("lockQuestionsAfterAnswering", e.target.checked)
          }
        />
      </Form.Group>

      <h5 className="mt-4 mb-3">Availability</h5>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Available Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={
                quiz.availableDate
                  ? new Date(quiz.availableDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                update(
                  "availableDate",
                  e.target.value ? new Date(e.target.value).toISOString() : ""
                )
              }
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={
                quiz.dueDate
                  ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                update(
                  "dueDate",
                  e.target.value ? new Date(e.target.value).toISOString() : ""
                )
              }
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Until Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={
                quiz.untilDate
                  ? new Date(quiz.untilDate).toISOString().slice(0, 16)
                  : ""
              }
              onChange={(e) =>
                update(
                  "untilDate",
                  e.target.value ? new Date(e.target.value).toISOString() : ""
                )
              }
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
