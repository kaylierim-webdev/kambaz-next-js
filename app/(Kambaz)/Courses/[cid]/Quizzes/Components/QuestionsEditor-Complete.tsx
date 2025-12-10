/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button, ListGroup, Alert } from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import QuestionEditor from "./QuestionEditor";

export default function QuestionsEditor({ quiz, setQuiz, totalPoints }: any) {
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [newQuestionType, setNewQuestionType] = useState<string>("Multiple Choice");

  const questions = quiz.questions || [];

  const addNewQuestion = () => {
    const newQuestion: any = {
      _id: `q-${Date.now()}`,
      type: newQuestionType,
      title: "",
      question: "",
      points: 1,
    };

    // Add type-specific defaults
    if (newQuestionType === "Multiple Choice") {
      newQuestion.choices = [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ];
    } else if (newQuestionType === "True/False") {
      newQuestion.answer = true;
    } else if (newQuestionType === "Fill in the Blank") {
      newQuestion.blanks = [""];
    }

    const updatedQuestions = [...questions, newQuestion];
    setQuiz({ ...quiz, questions: updatedQuestions });
    setEditingQuestionIndex(updatedQuestions.length - 1);
  };

  const updateQuestion = (index: number, updatedQuestion: any) => {
    const updatedQuestions = questions.map((q: any, i: number) =>
      i === index ? updatedQuestion : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const deleteQuestion = (index: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((_: any, i: number) => i !== index);
      setQuiz({ ...quiz, questions: updatedQuestions });
      if (editingQuestionIndex === index) {
        setEditingQuestionIndex(null);
      }
    }
  };

  const saveQuestion = () => {
    setEditingQuestionIndex(null);
  };

  const cancelEdit = () => {
    setEditingQuestionIndex(null);
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions</h5>
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Total Points: {totalPoints}</span>
        </div>
      </div>

      <div className="mb-3 d-flex gap-2 align-items-center">
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value)}
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="True/False">True/False</option>
          <option value="Fill in the Blank">Fill in the Blank</option>
        </select>
        <Button variant="primary" onClick={addNewQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <Alert variant="info">
          No questions yet. Click &quot;New Question&quot; to add your first question.
        </Alert>
      ) : (
        <ListGroup className="mb-3">
          {questions.map((question: any, index: number) => (
            <ListGroup.Item key={question._id}>
              {editingQuestionIndex === index ? (
                <QuestionEditor
                  question={question}
                  onUpdate={(updated: any) => updateQuestion(index, updated)}
                  onSave={saveQuestion}
                  onCancel={cancelEdit}
                />
              ) : (
                <div>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h6>
                        Question {index + 1}: {question.title || "(Untitled)"}
                      </h6>
                      <p className="mb-1 text-muted small">{question.type}</p>
                      <p className="mb-1">
                        {question.question.length > 100
                          ? `${question.question.substring(0, 100)}...`
                          : question.question}
                      </p>
                      <small className="text-muted">
                        Points: {question.points}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setEditingQuestionIndex(index)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteQuestion(index)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
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
