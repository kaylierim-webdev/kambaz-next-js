/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, Tab, Button, Container, Alert } from "react-bootstrap";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";
import * as client from "../../../client";
import { useDispatch } from "react-redux";
import { addQuiz, updateQuiz as updateQuizAction } from "../quizzesReducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid === "new") {
        // Create new quiz with default values
        setQuiz({
          _id: `new-${Date.now()}`,
          course: cid,
          title: "New Quiz",
          description: "",
          quizType: "Graded Quiz",
          assignmentGroup: "Quizzes",
          shuffleAnswers: true,
          timeLimit: 20,
          multipleAttempts: false,
          howManyAttempts: 1,
          showCorrectAnswers: false,
          accessCode: "",
          oneQuestionAtATime: true,
          webcamRequired: false,
          lockQuestionsAfterAnswering: false,
          published: false,
          points: 0,
          questions: [],
          availableDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          untilDate: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        });
        setLoading(false);
      } else {
        try {
          const data = await client.findQuizzesForCourse(cid as string);
          const currentQuiz = data.find((q: any) => q._id === qid);
          if (currentQuiz) {
            setQuiz(currentQuiz);
          } else {
            setError("Quiz not found");
          }
        } catch (err) {
          console.error(err);
          setError("Failed to load quiz");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchQuiz();
  }, [cid, qid]);

  const calculateTotalPoints = (questions: any[]) => {
    return questions.reduce((sum, q) => sum + (q.points || 0), 0);
  };

  const handleSave = async () => {
    try {
      const quizToSave = {
        ...quiz,
        points: calculateTotalPoints(quiz.questions || []),
      };

      if (qid === "new") {
        const created = await client.createQuizForCourse(
          cid as string,
          quizToSave
        );
        dispatch(addQuiz(created));
        router.push(`/Courses/${cid}/Quizzes/${created._id}`);
      } else {
        const updated = await client.updateQuiz(quizToSave);
        dispatch(updateQuizAction(updated));
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save quiz. Please try again.");
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      const quizToSave = {
        ...quiz,
        published: true,
        points: calculateTotalPoints(quiz.questions || []),
      };

      if (qid === "new") {
        const created = await client.createQuizForCourse(
          cid as string,
          quizToSave
        );
        dispatch(addQuiz(created));
        router.push(`/Courses/${cid}/Quizzes`);
      } else {
        const updated = await client.updateQuiz(quizToSave);
        dispatch(updateQuizAction(updated));
        router.push(`/Courses/${cid}/Quizzes`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save and publish quiz. Please try again.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (loading)
    return (
      <Container className="mt-4">
        <p>Loading...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  if (!quiz)
    return (
      <Container className="mt-4">
        <Alert variant="danger">Quiz not found</Alert>
      </Container>
    );

  const totalPoints = calculateTotalPoints(quiz.questions || []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{qid === "new" ? "Create New Quiz" : "Edit Quiz"}</h2>
        <div>
          <span className="me-3">
            <strong>Points:</strong> {totalPoints}
          </span>
          {quiz.published ? (
            <span className="badge bg-success">Published</span>
          ) : (
            <span className="badge bg-secondary">Not Published</span>
          )}
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
        className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <DetailsEditor quiz={quiz} setQuiz={setQuiz} />
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <QuestionsEditor
            quiz={quiz}
            setQuiz={setQuiz}
            totalPoints={totalPoints}
          />
        </Tab>
      </Tabs>

      <div className="d-flex gap-2 mb-4">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="success" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
      </div>
    </Container>
  );
}
