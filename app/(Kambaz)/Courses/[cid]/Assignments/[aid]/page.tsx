export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online Submit a link to the landing page of"
      />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} type="number" />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option>Percentage</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>
            </select>
            <br />
            <br />
            <label>Online Entry Options</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input
              type="checkbox"
              name="check-entry"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="check-entry"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>
            <br />
            <br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label>
            <br />
            <input id="wd-assign-to" defaultValue="Everyone" />
            <br />
            <br />
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input type="date" defaultValue="2024-05-13" id="wd-due-date" />
            <br />
            <br />
            <label htmlFor="wd-available-from">Available from</label>
            <br />
            <input
              type="date"
              defaultValue="2024-05-13"
              id="wd-available-from"
            />
            <div>
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                type="date"
                defaultValue="2024-05-20"
                id="wd-available-until"
              />
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
