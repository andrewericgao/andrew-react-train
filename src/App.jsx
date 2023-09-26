import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Banner from '/src/components/Banner.jsx';
import TermPage from '/src/components/TermPage.jsx';
// import Navigation from '/src/components/Navigation.jsx'; 
import { useJsonQuery } from '/src/utilities/fetchJson.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  const [selectedCourses, setSelectedCourses] = React.useState([]);

  const toggleCourseSelection = (courseId) => {
    setSelectedCourses(selectedCourses.includes(courseId)
      ? selectedCourses.filter(id => id !== courseId)
      : [...selectedCourses, courseId]
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      {/* <Navigation /> */}
      <Banner title={data ? data.title : 'Loading...'} />
      {data && <TermPage courses={data.courses} selectedCourses={selectedCourses} toggleCourseSelection={toggleCourseSelection} />}
    </div>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);