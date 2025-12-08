"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, Tab, Button } from "react-bootstrap";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";
import * as client from "../../../../client";
import { useDispatch } from "react-redux";
import { addQuiz, updateQuiz as updateQuizAction } from "../../reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid === "new") {
        setQuiz({
          _id: `new-${Date.now()}`,
          course: cid,
          title: "New Quiz",
          description: "",
          quizType: "graded_quiz",
          assignmentGroup: "Quizzes",
          shuffleAnswers: true,
          timeLimitMinutes: 20,
          timeLimitEnabled: false,
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
        });
      } else {
        const data = await client.findQuizzesForCourse(cid as string);
        const currentQuiz = data.find((q: any) => q._id === qid);
        setQuiz(currentQuiz);
      }
    };
    fetchQuiz();
  }, [cid, qid]);

  const handleSave = async () => {
    try {
      if (qid === "new") {
        const created = await client.createQuizForCourse(cid as string, quiz);
        dispatch(addQuiz(created));
        router.push(`/Courses/${cid}/Quizzes/${created._id}`);
      } else {
        const updated = await client.updateQuiz(quiz);
        dispatch(updateQuizAction(updated));
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAndPublish = async () => {
    quiz.published = true;
    await handleSave();
    router.push(`/Courses/${cid}/Quizzes`);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="p-3">
      <h2>{qid === "new" ? "Create New Quiz" : "Edit Quiz"}</h2>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
        className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <DetailsEditor quiz={quiz} setQuiz={setQuiz} />
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <QuestionsEditor quiz={quiz} setQuiz={setQuiz} />
        </Tab>
      </Tabs>

      <div className="mt-4 d-flex gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="success" onClick={handleSaveAndPublish}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}