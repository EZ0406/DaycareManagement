import React, { useState, useEffect } from 'react';
import StaffList from './StaffList';
import StaffModal from './StaffModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [deletingStaffId, setDeletingStaffId] = useState<number | null>(null);
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

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (staffMember: any) => {
    try {
      const response = await fetch(`/api/staff/${staffMember.id}`);
      if (response.ok) {
        const latestData = await response.json();
        setEditingStaff(latestData);
        setIsModalOpen(true);
      } else {
        console.error('Failed to fetch latest staff data');
        setEditingStaff(staffMember);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching staff member:', error);
      setEditingStaff(staffMember);
      setIsModalOpen(true);
    }
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeletingStaffId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitStaff = async (staffData: any) => {
    try {
      const method = editingStaff ? 'PUT' : 'POST';
      const url = editingStaff ? `/api/staff/${editingStaff.id}` : '/api/staff';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staffData)
      });
      
      if (response.ok) {
        fetchStaff();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingStaffId) return;
    
    try {
      const response = await fetch(`/api/staff/${deletingStaffId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchStaff();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Staff Management</h1>
        <button className="btn-primary" onClick={handleOpenAddModal}>
          + Add Staff
        </button>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <StaffList 
          staff={staff} 
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      )}

      <StaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmitStaff} 
        initialData={editingStaff}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Delete Staff Member?"
        message="Are you sure you want to remove this staff member? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default StaffPage;
