import React from 'react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    recipient: string;
    subject: string;
    body: string;
  } | null;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const handleCopy = () => {
    const text = `To: ${data.recipient}\nSubject: ${data.subject}\n\n${data.body}`;
    navigator.clipboard.writeText(text);
    alert('Email template copied to clipboard!');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <h2>Send Reminder</h2>
        <div className="reminder-preview" style={{ 
          background: 'rgba(0,0,0,0.2)', 
          padding: '1.5rem', 
          borderRadius: '12px',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          <p><strong>To:</strong> {data.recipient}</p>
          <p><strong>Subject:</strong> {data.subject}</p>
          <hr style={{ margin: '1rem 0', opacity: 0.1 }} />
          <p style={{ whiteSpace: 'pre-wrap' }}>{data.body}</p>
        </div>
        
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={handleCopy}>Copy Template</button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
