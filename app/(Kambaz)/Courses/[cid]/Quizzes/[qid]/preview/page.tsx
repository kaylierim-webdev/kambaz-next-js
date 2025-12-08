/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Alert } from "react-bootstrap";
import QuizTakingInterface from "../QuizTakingInterface";
import * as client from "../../../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizzesForCourse(cid as string);
      setQuiz(data.find((q: any) => q._id === qid));
    };
    load();
  }, [cid, qid]);

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <Alert variant="info" className="m-3">
       <strong>Preview Mode</strong> - Your answers won&apos;t be saved
      </Alert>
      <QuizTakingInterface quiz={quiz} isPreview={true} />
    </div>
  );
}