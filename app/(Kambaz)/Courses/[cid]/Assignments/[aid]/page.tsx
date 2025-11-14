"use client";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FormLabel,
  FormControl,
  Col,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import {
  addAssignment as addAssignmentAction,
  updateAssignment as updateAssignmentAction,
} from "../reducer";
import { v4 as uuidv4 } from "uuid";
import * as client from "../../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (state: any) => state.assignmentsReducer
  );
  const existing = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>(
    existing || {
      _id: uuidv4(),
      course: cid,
      title: "",
      description: "",
      points: 100,
      dueDate: "",
      availableDate: "",
      availableUntil: "",
    }
  );

  useEffect(() => {
    if (existing) setAssignment(existing);
  }, [existing]);

  const handleSave = async () => {
    // ensure points is a number
    assignment.points = Number(assignment.points) || 0;

    try {
      if (existing) {
        // update on server
        const updated = await client.updateAssignment(assignment);
        // update redux state from server response
        dispatch(updateAssignmentAction(updated));
      } else {
        // create on server under course
        const created = await client.createAssignmentForCourse(
          cid as string,
          assignment
        );
        dispatch(addAssignmentAction(created));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {}
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <h3>{existing ? "Edit Assignment" : "New Assignment"}</h3>
      <Form>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          type="text"
          placeholder="Assignment title"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <br />

        <FormLabel>Description</FormLabel>
        <FormControl
          as="textarea"
          rows={3}
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
        <br />

        <Row className="mb-3 align-items-center">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: Number((e.target as HTMLInputElement).value),
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <FormLabel column sm={2}>
            Due Date
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="date"
              value={assignment.dueDate}
              onChange={(e) =>
                setAssignment({ ...assignment, dueDate: e.target.value })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <FormLabel column sm={2}>
            Available From
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="date"
              value={assignment.availableDate}
              onChange={(e) =>
                setAssignment({ ...assignment, availableDate: e.target.value })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-center">
          <FormLabel column sm={2}>
            Available Until
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="date"
              value={assignment.availableUntil}
              onChange={(e) =>
                setAssignment({ ...assignment, availableUntil: e.target.value })
              }
            />
          </Col>
        </Row>

        <div className="d-flex gap-2 mt-3">
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
