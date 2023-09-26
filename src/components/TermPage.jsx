import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({ courses, selectedCourses, toggleCourseSelection }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');

  const filteredCourses = Object.keys(courses)
    .filter(key => courses[key].term === selectedTerm)
    .reduce((obj, key) => {
      obj[key] = courses[key];
      return obj;
    }, {});

  return (
    <div className="term-page">
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseList course={filteredCourses} selectedCourses={selectedCourses} toggleCourseSelection={toggleCourseSelection} />
    </div>
  );
};

export default TermPage;
