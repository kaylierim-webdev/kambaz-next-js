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
  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl id="wd-name" type="name" placeholder="A1 - ENV + HTML" />
      <br />
      <FormControl
        id="wd-description"
        as="textarea"
        rows={3}
        defaultValue="The assignment is available online Submit a link to the landing page of"
      />
      <br />
      <Form>
        <Row className="wd-points mb-3">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl type="number" placeholder="100" />
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
            <FormControl defaultValue="Everyone" className="mb-2" />

            <FormLabel>Due</FormLabel>
            <FormControl
              type="date"
              defaultValue="2024-05-13"
              className="mb-2"
            />

            <FormLabel>Available from</FormLabel>
            <FormControl
              type="date"
              defaultValue="2024-05-13"
              className="mb-2"
            />

            <FormLabel>Until</FormLabel>
            <FormControl type="date" defaultValue="2024-05-20" />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
