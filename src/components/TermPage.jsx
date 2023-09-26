import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import Modal from './Modal';

const TermPage = ({ courses, selectedCourses, toggleCourseSelection }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredCourses = Object.keys(courses)
    .filter(key => courses[key].term === selectedTerm)
    .reduce((obj, key) => {
      obj[key] = courses[key];
      return obj;
    }, {});

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

  return (
    <div className="term-page">
        <div className="d-flex justify-content-between">
            <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
            <button className="course-plan-btn" onClick={openModal}>Course Plan</button>
        </div>
    {isModalOpen && <Modal open={isModalOpen} close={closeModal}>
        {
          selectedCourses.length === 0
          ? <h2>Please click on a course to select it</h2>
          : selectedCourses.map(courseId => (
              <div key={courseId}>
                {courses[courseId].title} -- {courses[courseId].meets}
              </div>
            ))
        }
      </Modal>}
      <CourseList course={filteredCourses} selectedCourses={selectedCourses} toggleCourseSelection={toggleCourseSelection} />
    </div>
  );
};

export default TermPage;
