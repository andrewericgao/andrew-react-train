import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CoursePage = ({ course }) => {
  const { selectedCourseId } = useParams();
  const navigate = useNavigate();

  const specificCourse = course ? course[selectedCourseId] : null;

  const [title, setTitle] = React.useState(specificCourse ? specificCourse.title : '');
  const [time, setTime] = React.useState(specificCourse ? specificCourse.meets : '');

  useEffect(() => {
    if (specificCourse) {
      setTitle(specificCourse.title);
      setTime(specificCourse.meets);
    }
  }, [specificCourse]);

  const onCancelClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Edit Course</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Time:
          <input type="text" value={time} onChange={e => setTime(e.target.value)} />
        </label>
        <button type="button" onClick={onCancelClick}>Cancel</button>
      </form>
    </div>
  );
};

export default CoursePage;
