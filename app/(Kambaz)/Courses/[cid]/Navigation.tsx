"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CourseNavigation({
  params,
}: {
  params: { cid: string };
}) {
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
        const linkPath =
          label === "People"
            ? `/Courses/${cid}/${label}/Table`
            : `/Courses/${cid}/${label}`;

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
