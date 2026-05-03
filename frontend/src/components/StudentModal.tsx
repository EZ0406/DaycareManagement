import React, { useState, useEffect } from 'react';

interface Student {
  id?: number;
  name: string;
  dob: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  enrollment_date: string;
  tuition_due_date: string;
  renewal_date: string;
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Student) => void;
  initialData?: Student | null;
}

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Student>({
    name: '',
    dob: '',
    parent_name: '',
    parent_email: '',
    parent_phone: '',
    enrollment_date: '',
    tuition_due_date: '',
    renewal_date: ''
  });


  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        dob: '',
        parent_name: '',
        parent_email: '',
        parent_phone: '',
        enrollment_date: '',
        tuition_due_date: '',
        renewal_date: ''
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
        <h2>{isEdit ? 'Edit Student' : 'Add New Student'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Student Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input 
                type="date" 
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Parent/Guardian Name</label>
            <input 
              type="text" 
              value={formData.parent_name}
              onChange={(e) => setFormData({...formData, parent_name: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Parent Email</label>
              <input 
                type="email" 
                required
                value={formData.parent_email}
                onChange={(e) => setFormData({...formData, parent_email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Parent Phone</label>
              <input 
                type="tel" 
                value={formData.parent_phone}
                onChange={(e) => setFormData({...formData, parent_phone: e.target.value})}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Enrollment Date</label>
              <input 
                type="date" 
                value={formData.enrollment_date}
                onChange={(e) => setFormData({...formData, enrollment_date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Tuition Due Date</label>
              <input 
                type="date" 
                value={formData.tuition_due_date}
                onChange={(e) => setFormData({...formData, tuition_due_date: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Renewal Date</label>
            <input 
              type="date" 
              value={formData.renewal_date}
              onChange={(e) => setFormData({...formData, renewal_date: e.target.value})}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              {isEdit ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
