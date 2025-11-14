"use client";
import React, { useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: 1,
    name: "Module 1",
    description: "Module 1 sample description",
    course: "Course 101",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects" className="p-3">
      <h3>Working With Objects</h3>

      <h4>Assignment</h4>

      <div className="mb-3">
        <FormControl
          className="w-75 mb-2"
          id="wd-assignment-title"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
      </div>

      <div className="mb-3">
        <FormControl
          type="number"
          className="w-75 mb-2"
          id="wd-assignment-score"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              score: parseInt(e.target.value) || 0,
            })
          }
        />
        <a
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>

      <div className="mb-3">
        <FormCheck
          type="checkbox"
          id="wd-assignment-completed"
          label="Completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <a
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>

      <hr />

      <h4>Module</h4>

      <div className="mb-3">
        <FormControl
          className="w-75 mb-2"
          id="wd-module-name"
          value={moduleObj.name}
          onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
        />
        <a
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name/${moduleObj.name}`}
        >
          Update Module Name
        </a>
      </div>

      <div className="mb-3">
        <FormControl
          className="w-75 mb-2"
          id="wd-module-description"
          value={moduleObj.description}
          onChange={(e) =>
            setModuleObj({ ...moduleObj, description: e.target.value })
          }
        />
        <a
          className="btn btn-primary"
          href={`${MODULE_API_URL}/description/${moduleObj.description}`}
        >
          Update Module Description
        </a>
      </div>

      <hr />

      <a
        id="wd-retrieve-module-name"
        className="btn btn-secondary"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
    </div>
  );
}
