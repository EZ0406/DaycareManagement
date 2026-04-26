import React, { useState, useEffect } from 'react';
import StaffList from './StaffList';
import AddStaffModal from './AddStaffModal';

const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff');
      const data = await response.json();
      if (Array.isArray(data)) {
        setStaff(data);
      } else {
        console.error('Received non-array data:', data);
        setStaff([]);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async (newStaff: any) => {
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff)
      });
      if (response.ok) {
        fetchStaff();
      }
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Staff Management</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Staff
        </button>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <StaffList staff={staff} />
      )}

      <AddStaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddStaff} 
      />
    </div>
  );
};

export default StaffPage;
