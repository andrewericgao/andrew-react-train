import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Banner from '/src/components/Banner.jsx';
import CourseList from '/src/components/CourseList.jsx';
import { useJsonQuery } from '/src/utilities/fetchJson.js';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <Banner title={data ? data.title : 'Loading...'} />
      <div className="course-container">
        {data && <CourseList course={data.courses} />}
      </div>
    </div>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);