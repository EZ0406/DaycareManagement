import React, { useState, useEffect } from 'react';

interface ReminderItem {
  id: number;
  name: string;
  date: string;
  type: 'Tuition' | 'Certificate';
  status: 'Overdue' | 'Urgent' | 'Upcoming';
}

interface SummaryData {
  payments: number;
  expirations: number;
  overdue: number;
}

const HomePage: React.FC = () => {
  const [summary, setSummary] = useState<SummaryData>({ payments: 0, expirations: 0, overdue: 0 });
  const [details, setDetails] = useState<ReminderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [daysLimit, setDaysLimit] = useState<number | 'all'>('all');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const url = daysLimit === 'all' 
          ? '/api/reminders/upcoming' 
          : `/api/reminders/upcoming?tuitionDays=${daysLimit}&certDays=${daysLimit}`;
          
        const response = await fetch(url);
        const data = await response.json();
        setSummary(data.summary);
        setDetails(data.details);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, [daysLimit]);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <div className="range-selector">
          <label htmlFor="range">View Range:</label>
          <select 
            id="range" 
            value={daysLimit} 
            onChange={(e) => setDaysLimit(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          >
            <option value="3">Next 3 Days</option>
            <option value="7">Next 7 Days</option>
            <option value="14">Next 14 Days</option>
            <option value="30">Next 30 Days</option>
            <option value="all">All Upcoming</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loader">Loading your dashboard...</div>
      ) : (
        <div className="dashboard-grid">
          {/* Overdue Alert Bar if any */}
          {summary.overdue > 0 && (
            <div className="overdue-alert-bar">
              <span className="icon">⚠️</span>
              <span><strong>Attention!</strong> There are {summary.overdue} overdue items that require immediate action.</span>
            </div>
          )}

          {/* Component 1: SummaryCards */}
          <div className="summary-cards">
            <div className={`summary-card ${summary.overdue > 0 ? 'has-overdue' : ''}`}>
              <div className="card-icon">💰</div>
              <div className="card-info">
                <h3>{summary.payments}</h3>
                <p>Payment Actions</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="card-icon">📜</div>
              <div className="card-info">
                <h3>{summary.expirations}</h3>
                <p>Staff Cert Actions</p>
              </div>
            </div>
          </div>

          {/* Component 2: UpcomingList */}
          <div className="upcoming-section">
            <h2>Upcoming Schedule</h2>
            <div className="table-container">
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {details.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
                        No upcoming events for the {daysLimit === 'all' ? 'foreseeable future' : `next ${daysLimit} days`}.
                      </td>
                    </tr>
                  ) : (
                    details.map((item, index) => (
                      <tr key={`${item.type}-${item.id}-${index}`} className={item.status.toLowerCase().replace(' ', '-')}>
                        <td>{item.name}</td>
                        <td>
                          <span className={`badge ${item.type.toLowerCase()}`}>
                            {item.type}
                          </span>
                        </td>
                        <td>
                          {item.date}
                        </td>
                        <td>
                          <span className={`status-tag ${item.status.toLowerCase().replace(' ', '-')}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
