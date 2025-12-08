"use client";

import { Button, ListGroup, Badge } from "react-bootstrap";
import { useState } from "react";
import QuestionEditor from "./QuestionEditor";

export default function QuestionsEditor({ quiz, setQuiz }: any) {
  const [editing, setEditing] = useState<string | null>(null);

  const addQuestion = () => {
    const newQ = {
      _id: `q-${Date.now()}`,
      type: "multiple_choice",
      title: `Question ${quiz.questions.length + 1}`,
      question: "",
      points: 1,
      choices: [
        { _id: `c1-${Date.now()}`, text: "", correct: true },
        { _id: `c2-${Date.now()}`, text: "", correct: false },
      ],
    };
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQ],
      points: quiz.points + 1,
    });
    setEditing(newQ._id);
  };

  const updateQ = (qid: string, updated: any) => {
    const old = quiz.questions.find((q: any) => q._id === qid);
    const diff = updated.points - (old?.points || 0);
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q: any) => (q._id === qid ? updated : q)),
      points: quiz.points + diff,
    });
  };

  const deleteQ = (qid: string) => {
    const q = quiz.questions.find((q: any) => q._id === qid);
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((q: any) => q._id !== qid),
      points: quiz.points - (q?.points || 0),
    });
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h4>Questions</h4>
          <span className="text-muted">Total: {quiz.points} pts</span>
        </div>
        <Button variant="danger" onClick={addQuestion}>
          + New Question
        </Button>
      </div>

      {quiz.questions.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
          <p className="text-muted">No questions yet</p>
          <Button onClick={addQuestion}>Add First Question</Button>
        </div>
      ) : (
        <ListGroup>
          {quiz.questions.map((q: any, i: number) => (
            <ListGroup.Item key={q._id} className="p-3">
              {editing === q._id ? (
                <QuestionEditor
                  question={q}
                  onSave={(updated: any) => {
                    updateQ(q._id, updated);
                    setEditing(null);
                  }}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <div className="d-flex justify-content-between">
                  <div>
                    <Badge bg="secondary" className="me-2">Q{i + 1}</Badge>
                    <strong>{q.title}</strong>
                    <Badge bg="primary" className="ms-2">{q.points} pts</Badge>
                    <div className="text-muted small mt-1">
                      {q.type.replace(/_/g, " ")}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="outline-primary" onClick={() => setEditing(q._id)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        if (confirm("Delete this question?")) deleteQ(q._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}