import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>{message}</p>
        
        <div className="modal-actions" style={{ justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button 
            className="btn-primary" 
            style={{ backgroundColor: '#fb7185' }} 
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
