import React from 'react';

const CourseList = ({ course }) => {
  return (
    <ul>
      {Object.keys(course).map(key => (
        <li key={key}>
          {course[key].number}, {course[key].title}, {course[key].term}, {course[key].meets}
        </li>
      ))}
    </ul>
  );
};

export default CourseList;