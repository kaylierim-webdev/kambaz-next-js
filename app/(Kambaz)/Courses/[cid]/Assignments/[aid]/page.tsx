"use client";
import { assignments } from "@/app/(Kambaz)/Database";
import { useParams } from "next/navigation";
import {
  FormLabel,
  FormControl,
  Col,
  Form,
  Row,
  FormSelect,
  FormCheck,
} from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  const assignment = assignments.find((a) => a._id === aid && a.course === cid);

  if (!assignment) {
    return <div className="p-3 text-danger">Assignment not found.</div>;
  }
  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        type="name"
        placeholder="Assignment title"
        defaultValue={assignment.title}
      />
      <br />
      <FormControl
        id="wd-description"
        as="textarea"
        rows={3}
        defaultValue={assignment.description}
      />
      <br />
      <Form>
        <Row className="wd-points mb-3">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="number"
              placeholder="100"
              defaultValue={assignment.points}
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <FormLabel column sm={2}>
            Assignment Group
          </FormLabel>
          <Col sm={10}>
            <FormSelect defaultValue="ASSIGNMENTS">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <FormLabel column sm={2}>
            Display Grade as
          </FormLabel>
          <Col sm={10}>
            <FormSelect defaultValue="Percentage">
              <option>Percentage</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <FormLabel column sm={2}>
            Submission Type
          </FormLabel>
          <Col sm={10}>
            <FormSelect defaultValue="Online">
              <option>Online</option>
            </FormSelect>
            <div className="mt-2">
              <FormLabel>Online Entry Options</FormLabel>
              <FormCheck
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
              />
              <FormCheck
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
              />
              <FormCheck
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
              />
              <FormCheck
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
              />
              <FormCheck
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <FormLabel column sm={2}>
            Assign
          </FormLabel>
          <Col sm={10}>
            <FormLabel>Assign to</FormLabel>
            <FormControl className="mb-2" />

            <FormLabel>Due</FormLabel>
            <FormControl
              type="date"
              defaultValue={assignment.dueDate}
              className="mb-2"
            />

            <FormLabel>Available from</FormLabel>
            <FormControl
              type="date"
              defaultValue={assignment.availableDate}
              className="mb-2"
            />

            <FormLabel>Until</FormLabel>
            <FormControl type="date" />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
