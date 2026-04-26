import React, { useState } from 'react';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (staff: any) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    hired_date: '',
    pay_date: '',
    certificate_expiration: '',
    training_due_date: '',
    day_off: ''
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    setError('');
    onAdd(formData);
    setFormData({
      name: '',
      hired_date: '',
      pay_date: '',
      certificate_expiration: '',
      training_due_date: '',
      day_off: ''
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Staff Member</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Hired Date</label>
              <input 
                type="date" 
                value={formData.hired_date}
                onChange={(e) => setFormData({...formData, hired_date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Pay Date</label>
              <input 
                type="date" 
                value={formData.pay_date}
                onChange={(e) => setFormData({...formData, pay_date: e.target.value})}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Cert. Expiration</label>
              <input 
                type="date" 
                value={formData.certificate_expiration}
                onChange={(e) => setFormData({...formData, certificate_expiration: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Training Due</label>
              <input 
                type="date" 
                value={formData.training_due_date}
                onChange={(e) => setFormData({...formData, training_due_date: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Day Off</label>
            <input 
              type="text" 
              placeholder="e.g. Friday"
              value={formData.day_off}
              onChange={(e) => setFormData({...formData, day_off: e.target.value})}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Staff</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
