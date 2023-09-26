import React from 'react';
import '/Users/andrewgao/Desktop/Northwestern/andrew-react-train/src/App.css';

const CourseList = ({ course }) => {
    return (
      <div className="course-container">
        {Object.keys(course).map(key => (
          <div className="course-card" key={key}>
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