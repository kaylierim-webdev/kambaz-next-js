"use client";

import { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import React from "react";

interface Choice {
  _id: string;
  text: string;
  correct: boolean;
}

type QuestionType = "multiple_choice" | "true_false" | "fill_blank";

interface Question {
  _id: string;
  title: string;
  points: number;
  type: QuestionType;
  question: string;
  choices?: Choice[];
  answerIsTrue?: boolean;
  answers?: string[];
}

interface QuestionEditorProps {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}

export default function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [q, setQ] = useState<Question>({ ...question });

  const update = (field: keyof Question | string, val: string | number | boolean) => setQ({ ...q, [field]: val });

  const addChoice = () => {
    setQ({
      ...q,
      choices: [...(q.choices as Choice[]), { _id: `c-${Date.now()}`, text: "", correct: false }],
    });
  };

  const updateChoice = (idx: number, field: keyof Choice, val: string | boolean) => {
    const choices = [...(q.choices as Choice[])];
    if (field === "correct" && val) {
      choices.forEach((c, i) => (c.correct = i === idx));
    } else {
      (choices[idx] as any)[field] = val;
    }
    setQ({ ...q, choices });
  };

  const deleteChoice = (idx: number) => {
    if (q.choices && q.choices.length <= 2) {
      alert("Need at least 2 choices");
      return;
    }
    setQ({ ...q, choices: q.choices?.filter((_: Choice, i: number) => i !== idx) });
  };

  const addAnswer = () => {
    setQ({ ...q, answers: [...(q.answers || []), ""] });
  };

  const updateAnswer = (idx: number, val: string) => {
    const ans = [...(q.answers as string[])];
    ans[idx] = val;
    setQ({ ...q, answers: ans });
  };

  const deleteAnswer = (idx: number) => {
    setQ({ ...q, answers: q.answers?.filter((_a: string, i: number) => i !== idx) });
  };

  const changeType = (type: QuestionType) => {
    const updates: Partial<Question> = { type };
    if (type === "multiple_choice") {
      updates.choices = [
        { _id: `c1-${Date.now()}`, text: "", correct: true },
        { _id: `c2-${Date.now()}`, text: "", correct: false },
      ];
      delete updates.answerIsTrue;
      delete updates.answers;
    } else if (type === "true_false") {
      updates.answerIsTrue = true;
      delete updates.choices;
      delete updates.answers;
    } else if (type === "fill_blank") {
      updates.answers = [""];
      delete updates.choices;
      delete updates.answerIsTrue;
    }
    setQ({ ...q, ...updates });
  };

  return (
    <div className="border rounded p-3 bg-light">
      <Form>
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={q.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Question title"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={q.points}
                onChange={(e) => update("points", parseInt(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select value={q.type} onChange={(e) => changeType(e.target.value as QuestionType)}>
            <option value="multiple_choice">Multiple Choice</option>
            <option value="true_false">True/False</option>
            <option value="fill_blank">Fill in Blank</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={q.question}
            onChange={(e) => update("question", e.target.value)}
          />
        </Form.Group>

        {q.type === "multiple_choice" && (
          <div className="mb-3">
            <Form.Label>Choices</Form.Label>
            {q.choices?.map((c: Choice, i: number) => (
              <InputGroup key={c._id} className="mb-2">
                <InputGroup.Radio
                  checked={c.correct}
                  onChange={() => updateChoice(i, "correct", true)}
                />
                <Form.Control
                  value={c.text}
                  onChange={(e) => updateChoice(i, "text", e.target.value)}
                  placeholder={`Choice ${i + 1}`}
                />
                <Button variant="outline-danger" onClick={() => deleteChoice(i)} disabled={q.choices && q.choices.length <= 2}>
                  <FaTrash />
                </Button>
              </InputGroup>
            ))}
            <Button size="sm" variant="outline-secondary" onClick={addChoice}>
              + Add Choice
            </Button>
          </div>
        )}

        {q.type === "true_false" && (
          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="True"
                checked={q.answerIsTrue === true}
                onChange={() => update("answerIsTrue", true)}
              />
              <Form.Check
                type="radio"
                label="False"
                checked={q.answerIsTrue === false}
                onChange={() => update("answerIsTrue", false)}
              />
            </div>
          </Form.Group>
        )}

        {q.type === "fill_blank" && (
          <div className="mb-3">
            <Form.Label>Acceptable Answers</Form.Label>
            {q.answers?.map((a: string, i: number) => (
              <InputGroup key={i} className="mb-2">
                <Form.Control
                  value={a}
                  onChange={(e) => updateAnswer(i, e.target.value)}
                  placeholder={`Answer ${i + 1}`}
                />
                <Button variant="outline-danger" onClick={() => deleteAnswer(i)}>
                  <FaTrash />
                </Button>
              </InputGroup>
            ))}
            <Button size="sm" variant="outline-secondary" onClick={addAnswer}>
              + Add Answer
            </Button>
          </div>
        )}

        <div className="d-flex gap-2 mt-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(q)} disabled={!q.title || !q.question}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}