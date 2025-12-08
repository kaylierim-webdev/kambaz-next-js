"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Button } from "react-bootstrap";
import QuizTakingInterface from "../QuizTakingInterface";
import * as client from "../../../../client";
import { useSelector } from "react-redux";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [canTake, setCanTake] = useState(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizzesForCourse(cid as string);
      const q = data.find((q: any) => q._id === qid);
      setQuiz(q);

      if (currentUser?._id) {
        const atts = await client.getQuizAttempts(qid as string, currentUser._id);
        setAttempts(atts);
        if (q.multipleAttempts && atts.length >= q.howManyAttempts) {
          setCanTake(false);
        }
      }
    };
    load();
  }, [cid, qid, currentUser]);

  const handleSubmit = async (answers: any[]) => {
    if (!currentUser?._id) return;
    await client.submitQuizAttempt(qid as string, currentUser._id, answers);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  if (!quiz) return <p>Loading...</p>;

  if (!canTake) {
    return (
      <div className="p-3">
        <Alert variant="warning">
          <h4>Max Attempts Reached</h4>
          <p>You've used all {quiz.howManyAttempts} attempts</p>
          <Button onClick={() => router.back()}>Back</Button>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      {attempts.length > 0 && (
        <Alert variant="info" className="m-3">
          Attempt {attempts.length + 1} of {quiz.howManyAttempts}
        </Alert>
      )}
      <QuizTakingInterface quiz={quiz} onSubmit={handleSubmit} />
    </div>
  );
}