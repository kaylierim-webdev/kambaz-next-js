"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CourseNavigation({ params }: { params: { cid: any } }) {
  const pathname = usePathname();
  const { cid } = params;

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const linkPath = `/Courses/${cid}/${label}`;

        const isActive = pathname.includes(`/${label}`);

        return (
          <Link
            key={label}
            href={linkPath}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
