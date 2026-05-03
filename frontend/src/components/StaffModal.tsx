import React, { useState, useEffect } from 'react';

interface Staff {
  id?: number;
  name: string;
  hired_date: string;
  pay_date: string;
  certificate_expiration: string;
  training_due_date: string;
  day_off: string;
}

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (staff: Staff) => void;
  initialData?: Staff | null;
}

const StaffModal: React.FC<StaffModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Staff>({
    name: '',
    hired_date: '',
    pay_date: '',
    certificate_expiration: '',
    training_due_date: '',
    day_off: ''
  });


  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        hired_date: '',
        pay_date: '',
        certificate_expiration: '',
        training_due_date: '',
        day_off: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const isEdit = !!initialData;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEdit ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
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
            <button type="submit" className="btn-primary">
              {isEdit ? 'Update Staff' : 'Add Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
