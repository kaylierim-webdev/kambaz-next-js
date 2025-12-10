/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Button, Row, Col } from "react-bootstrap";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

export default function QuestionEditor({
  question,
  onUpdate,
  onSave,
  onCancel,
}: any) {
  const updateField = (field: string, value: any) => {
    onUpdate({ ...question, [field]: value });
  };

  const renderMultipleChoice = () => {
    const choices = question.choices || [];

    const addChoice = () => {
      const newChoices = [...choices, { text: "", isCorrect: false }];
      updateField("choices", newChoices);
    };

    const updateChoice = (index: number, text: string) => {
      const newChoices = choices.map((c: any, i: number) =>
        i === index ? { ...c, text } : c
      );
      updateField("choices", newChoices);
    };

    const setCorrectChoice = (index: number) => {
      const newChoices = choices.map((c: any, i: number) => ({
        ...c,
        isCorrect: i === index,
      }));
      updateField("choices", newChoices);
    };

    const removeChoice = (index: number) => {
      if (choices.length > 2) {
        const newChoices = choices.filter((_: any, i: number) => i !== index);
        updateField("choices", newChoices);
      }
    };

    return (
      <Form.Group className="mb-3">
        <Form.Label>Answer Choices</Form.Label>
        {choices.map((choice: any, index: number) => (
          <div key={index} className="d-flex gap-2 mb-2 align-items-center">
            <Form.Check
              type="radio"
              name="correctAnswer"
              checked={choice.isCorrect}
              onChange={() => setCorrectChoice(index)}
              title="Mark as correct answer"
            />
            <Form.Control
              type="text"
              value={choice.text}
              onChange={(e) => updateChoice(index, e.target.value)}
              placeholder={`Choice ${index + 1}`}
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => removeChoice(index)}
              disabled={choices.length <= 2}
            >
              <FaTrash />
            </Button>
            {choice.isCorrect && (
              <FaCheck className="text-success" title="Correct answer" />
            )}
          </div>
        ))}
        <Button variant="outline-primary" size="sm" onClick={addChoice}>
          <FaPlus className="me-1" />
          Add Choice
        </Button>
      </Form.Group>
    );
  };

  const renderTrueFalse = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Correct Answer</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="True"
            name="trueFalseAnswer"
            checked={question.answer === true}
            onChange={() => updateField("answer", true)}
          />
          <Form.Check
            type="radio"
            label="False"
            name="trueFalseAnswer"
            checked={question.answer === false}
            onChange={() => updateField("answer", false)}
          />
        </div>
      </Form.Group>
    );
  };

  const renderFillInBlank = () => {
    const blanks = question.blanks || [];

    const addBlank = () => {
      const newBlanks = [...blanks, ""];
      updateField("blanks", newBlanks);
    };

    const updateBlank = (index: number, value: string) => {
      const newBlanks = blanks.map((b: string, i: number) =>
        i === index ? value : b
      );
      updateField("blanks", newBlanks);
    };

    const removeBlank = (index: number) => {
      if (blanks.length > 1) {
        const newBlanks = blanks.filter((_: string, i: number) => i !== index);
        updateField("blanks", newBlanks);
      }
    };

    return (
      <Form.Group className="mb-3">
        <Form.Label>Possible Correct Answers</Form.Label>
        <small className="text-muted d-block mb-2">
          Add all acceptable answers (case insensitive matching)
        </small>
        {blanks.map((blank: string, index: number) => (
          <div key={index} className="d-flex gap-2 mb-2">
            <Form.Control
              type="text"
              value={blank}
              onChange={(e) => updateBlank(index, e.target.value)}
              placeholder={`Answer ${index + 1}`}
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => removeBlank(index)}
              disabled={blanks.length <= 1}
            >
              <FaTrash />
            </Button>
          </div>
        ))}
        <Button variant="outline-primary" size="sm" onClick={addBlank}>
          <FaPlus className="me-1" />
          Add Answer
        </Button>
      </Form.Group>
    );
  };

  return (
    <div className="border rounded p-3 bg-light">
      <Form>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Question Title</Form.Label>
              <Form.Control
                type="text"
                value={question.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Enter question title"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={question.points}
                onChange={(e) =>
                  updateField("points", parseInt(e.target.value) || 0)
                }
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={question.question}
            onChange={(e) => updateField("question", e.target.value)}
            placeholder="Enter your question here"
          />
        </Form.Group>

        {question.type === "Multiple Choice" && renderMultipleChoice()}
        {question.type === "True/False" && renderTrueFalse()}
        {question.type === "Fill in the Blank" && renderFillInBlank()}

        <div className="d-flex gap-2 justify-content-end">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Question
          </Button>
        </div>
      </Form>
    </div>
  );
}
