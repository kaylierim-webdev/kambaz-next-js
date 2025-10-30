"use client";
import * as db from "../Database";
import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import {
  enrollCourse,
  unenrollCourse,
} from "../Courses/[cid]/Enrollments/reducer";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const dispatch = useDispatch();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { courses } = useSelector((state: any) => state.coursesReducer);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  if (!currentUser) {
    return (
      <div className="p-3 text-danger">Please sign in to view courses.</div>
    );
  }

  const isFaculty = currentUser.role === "FACULTY";

  const userEnrollments = enrollments.filter(
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (e: any) => e.user === currentUser._id
  );
  const enrolledCourseIds = userEnrollments.map(
    /* eslint-disable @typescript-eslint/no-explicit-any */ (e: any) => e.course
  );

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter(
        /* eslint-disable @typescript-eslint/no-explicit-any */ (c: any) =>
          enrolledCourseIds.includes(c._id)
      );

  const handleEnroll = (courseId: string) => {
    dispatch(
      enrollCourse({ _id: uuidv4(), user: currentUser._id, course: courseId })
    );
  };

  const handleUnenroll = (courseId: string) => {
    dispatch(unenrollCourse({ user: currentUser._id, course: courseId }));
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Enrolled Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {displayedCourses.map(
          /* eslint-disable @typescript-eslint/no-explicit-any */ (
            course: any
          ) => {
            const isEnrolled = enrolledCourseIds.includes(course._id);
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    {isEnrolled ? (
                      <Link href={`/Courses/${course._id}/Home`}>
                        <Button variant="primary">Go</Button>
                      </Link>
                    ) : (
                      <Button variant="secondary" disabled>
                        Not Enrolled
                      </Button>
                    )}

                    {isFaculty ? (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    ) : isEnrolled ? (
                      <Button
                        variant="danger"
                        className="float-end"
                        onClick={() => handleUnenroll(course._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        className="float-end"
                        onClick={() => handleEnroll(course._id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          }
        )}
      </Row>
    </div>
  );
}
