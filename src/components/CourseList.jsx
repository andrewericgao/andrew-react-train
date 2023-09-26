import React from 'react';
import '/src/App.css';

const CourseList = ({ course, selectedCourses, toggleCourseSelection, isCourseSelectable}) => {
    return (
      <div className="course-container">
        {Object.keys(course).map(key => (
          <div 
            className={`course-card ${selectedCourses.includes(key) ? 'selected' : ''} ${isCourseSelectable(key) ? '' : 'not-allowed'}`} 
            key={key} 
            onClick={() => {
              if (selectedCourses.includes(key)) {
                toggleCourseSelection(key);
              } else if (isCourseSelectable(key)) {
                toggleCourseSelection(key);
              }
            }}
          >            
          <div className="course-info">
              <div className="course-term">
                {course[key].term} CS {course[key].number}
              </div>
              <div className="course-title">
                {course[key].title}
              </div>
            </div>
            <hr />
            <div className="course-meets">
              {course[key].meets}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default CourseList;