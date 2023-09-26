import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import React from 'react';
import Banner from '/Users/andrewgao/Desktop/Northwestern/andrew-react-train/src/components/Banner.jsx';
import CourseList from '/Users/andrewgao/Desktop/Northwestern/andrew-react-train/src/components/CourseList.jsx';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};



const App = () => {
  return (
    <div className="app-container">
      <Banner title={schedule.title} />
      <div className="course-container">
        <CourseList course={schedule.courses} />
      </div>
    </div>
  );
};

export default App;
