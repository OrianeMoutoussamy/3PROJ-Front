import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
