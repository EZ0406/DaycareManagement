import React, { useState } from 'react';
import StaffPage from './components/StaffPage';
import StudentPage from './components/StudentPage';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState<'home' | 'staff' | 'students'>('home');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? 'light-theme' : '';
  };

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <nav className="sidebar">
        <div className="logo">DaycarePro</div>
        <ul>
          <li 
            className={activePage === 'home' ? 'active' : ''} 
            onClick={() => setActivePage('home')}
          >
            Home
          </li>
          <li 
            className={activePage === 'staff' ? 'active' : ''} 
            onClick={() => setActivePage('staff')}
          >
            Staff
          </li>
          <li 
            className={activePage === 'students' ? 'active' : ''} 
            onClick={() => setActivePage('students')}
          >
            Students
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {activePage === 'home' && <HomePage />}
        {activePage === 'staff' && <StaffPage />}
        {activePage === 'students' && <StudentPage />}
      </main>
      
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default App;
