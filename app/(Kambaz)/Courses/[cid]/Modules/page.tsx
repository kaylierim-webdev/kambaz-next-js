"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (state: any) => state.modulesReducer
  );
  const dispatch = useDispatch();
  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter(
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (module: any) => module.course === cid
          )
          .map(
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (module: any) => (
              <ListGroupItem
                key={module._id}
                className="wd-module p-0 mb-5 fs-5 border-gray"
              >
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));
                    }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map(
                      /* eslint-disable @typescript-eslint/no-explicit-any */
                      (lesson: any) => (
                        <ListGroupItem
                          key={lesson._id}
                          className="wd-lesson p-3 ps-1"
                        >
                          <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                          <LessonControlButtons />
                        </ListGroupItem>
                      )
                    )}
                  </ListGroup>
                )}
              </ListGroupItem>
            )
          )}
      </ListGroup>
    </div>
  );
}
