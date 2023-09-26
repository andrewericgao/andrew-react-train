import React from 'react';

const TermSelector = ({ selectedTerm, setSelectedTerm }) => {
  const terms = ['Fall', 'Winter', 'Spring'];

  return (
    <div className="term-selector">
      {terms.map(term => (
        <button 
          key={term}
          className={`term-button ${term === selectedTerm ? 'selected' : ''}`}
          onClick={() => setSelectedTerm(term)}
        >
          {term}
        </button>
      ))}
    </div>
  );
};

export default TermSelector;
