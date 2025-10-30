"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (course: any) => course._id === cid
  );

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          role="button"
          onClick={toggleSidebar}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showSidebar && (
          <div className="d-none d-md-block">
            <CourseNavigation
              params={{
                cid: cid,
              }}
            />
          </div>
        )}
        <div className={`flex-fill ${!showSidebar ? "w-100" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
