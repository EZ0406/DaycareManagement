import React from 'react';
import StaffPage from './components/StaffPage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.className = isDarkMode ? 'light-theme' : '';
  };

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <nav className="sidebar">
        <div className="logo">DaycarePro</div>
        <ul>
          <li className="active">Staff</li>
          <li>Students</li>
          <li>Reminders</li>
        </ul>
      </nav>
      <main className="main-content">
        <StaffPage />
      </main>
      
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default App;
