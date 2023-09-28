import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormData } from '/src/utilities/useFormData.js';
import { useDbUpdate } from '/src/firebase.js';

const validator = (id, value) => {
  if (id === 'title') {
    if (value.length < 2) {
      return "The title must be at least two characters";
    }
  } else if (id === 'time') {
    const timePattern = /^([MTWF]+[\s]+[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})$/;
    if (value && !timePattern.test(value)) {
      return "Must contain days and start-end, in this structure: MWF 12:00-13:20";
    }
  }
  return "";
};

const CoursePage = ({ course }) => {
  const { selectedCourseId } = useParams();
  const navigate = useNavigate();
  const [updateData] = useDbUpdate(`/courses/${selectedCourseId}`);
  const specificCourse = course ? course[selectedCourseId] : null;
  const [formData, change] = useFormData(validator, {
    title: specificCourse ? specificCourse.title : '',
    time: specificCourse ? specificCourse.meets : ''
  });

  const onSubmitClick = () => {
    if (!formData.errors) {
      updateData({
        title: formData.values.title,
        meets: formData.values.time
      });
      navigate('/');
    }
  };

  const onCancelClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Edit Course</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Title:
          <input id="title" type="text" value={formData.values.title} onChange={change} />
          {formData.errors && formData.errors.title && <span>{formData.errors.title}</span>}
        </label>
        <label>
          Time:
          <input id="time" type="text" value={formData.values.time} onChange={change} />
          {formData.errors && formData.errors.time && <span>{formData.errors.time}</span>}
        </label>
        <button type="button" onClick={onCancelClick}>Cancel</button>
        <button type="button" onClick={onSubmitClick} disabled={!!formData.errors}>Submit</button>
      </form>
    </div>
  );
};

export default CoursePage;
