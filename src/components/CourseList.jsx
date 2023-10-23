import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDbData, useAuthState } from '/src/firebase.js';
import { useProfile } from '/src/utilities/profile';
import { isCourseConflict } from '/src/utilities/timeConflictUtilities';
import '/src/App.css';

const CourseList = ({ course, selectedCourses, toggleCourseSelection }) => {
  const [user] = useAuthState();
  const [profile, profileLoading, profileError] = useProfile();
  const { selectedCourseId } = useParams();
  const navigate = useNavigate();
  const specificCourse = course ? course[selectedCourseId] : null;
  const [title, setTitle] = React.useState(specificCourse ? specificCourse.title : '');
  const [time, setTime] = React.useState(specificCourse ? specificCourse.meets : '');

  const isCourseSelectable = (courseId) => {
    const selectedCourseDetails = selectedCourses.filter(id => id !== courseId).map(id => course[id]);
    return !selectedCourseDetails.some(selectedCourse => isCourseConflict(course[courseId], selectedCourse));
  };

  useEffect(() => {
    if (specificCourse) {
      setTitle(specificCourse.title);
      setTime(specificCourse.meets);
    }
  }, [specificCourse]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="card m-1 p-2"
    data-cy="course">
<div className="course-container">
      {Object.keys(course).map(key => (
        <div 
          className={`course-card ${selectedCourses.includes(key) ? 'selected' : ''} ${isCourseSelectable(key) ? '' : 'not-allowed'}`}
          key={key} 
          onClick={() => isCourseSelectable(key) && toggleCourseSelection(key)}
        >
          <div className="course-info">
            <div className="course-term">{course[key].term} CS {course[key].number}</div>
            <div className="course-title">{course[key].title}</div>
            {profile?.isAdmin && <Link to={`/edit/${key}`}>Edit</Link>}
          </div>
          <hr />
          <div className="course-meets">{course[key].meets}</div>
        </div>
      ))}
      {selectedCourseId && (
        <form onSubmit={onFormSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label>
            Time:
            <input type="text" value={time} onChange={e => setTime(e.target.value)} />
          </label>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
    </div>
    
  );
};

export default CourseList;