import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import Banner from '/src/components/Banner.jsx';
import TermPage from '/src/components/TermPage.jsx';
import CourseList from '/src/components/CourseList.jsx';
import CoursePage from '/src/components/CoursePage.jsx';
import { useDbData } from '/src/firebase.js'; // Update this import
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  const [data, error] = useDbData('/');
  const [selectedCourses, setSelectedCourses] = React.useState([]);
  

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(selectedCourses.includes(courseId)
      ? selectedCourses.filter(id => id !== courseId)
      : [...selectedCourses, courseId]
    );
  };

  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="app-container">
      <Banner title={data ? data.title : 'Loading...'} />
      <Routes>
      <Route path="/" element={<TermPage courses={data.courses} selectedCourses={selectedCourses} toggleCourseSelection={toggleCourseSelection} />} />
<Route path="/edit/:selectedCourseId" element={<CoursePage course={data.courses} />} />
      </Routes>
    </div>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);