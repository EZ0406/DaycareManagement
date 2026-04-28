import React, { useState } from 'react';
import StaffPage from './components/StaffPage';
import StudentPage from './components/StudentPage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState<'staff' | 'students'>('staff');

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
          <li style={{ opacity: 0.5, cursor: 'not-allowed' }}>Reminders</li>
        </ul>
      </nav>
      <main className="main-content">
        {activePage === 'staff' ? <StaffPage /> : <StudentPage />}
      </main>
      
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default App;
