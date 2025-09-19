import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt={"React logo"}
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1111" className="wd-dashboard-course-link">
            <Image
              src="/images/coop.png"
              width={200}
              height={150}
              alt={"Coop image"}
            />
            <div>
              <h5> Coop CS1210 </h5>
              <p className="wd-dashboard-course-title">Coop course</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2222" className="wd-dashboard-course-link">
            <Image
              src="/images/digidesign.png"
              width={200}
              height={150}
              alt={"Digital design image"}
            />
            <div>
              <h5> Digital design </h5>
              <p className="wd-dashboard-course-title">Digital design</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/3333" className="wd-dashboard-course-link">
            <Image
              src="/images/labdigidesign.png"
              width={200}
              height={150}
              alt={"Lab digital design image"}
            />
            <div>
              <h5> Lab digital design </h5>
              <p className="wd-dashboard-course-title">Lab digital design</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4444" className="wd-dashboard-course-link">
            <Image
              src="/images/french.png"
              width={200}
              height={150}
              alt={"French image"}
            />
            <div>
              <h5> French </h5>
              <p className="wd-dashboard-course-title">French</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/5555" className="wd-dashboard-course-link">
            <Image
              src="/images/math.png"
              width={200}
              height={150}
              alt={"Math image"}
            />
            <div>
              <h5> Math </h5>
              <p className="wd-dashboard-course-title">Math</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/6666" className="wd-dashboard-course-link">
            <Image
              src="/images/teaching.png"
              width={200}
              height={150}
              alt={"Teaching assistant training image"}
            />
            <div>
              <h5> Teaching assistant training </h5>
              <p className="wd-dashboard-course-title">
                Teaching assistant training
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
