import React, { useState, useEffect } from 'react';
import StudentList from './StudentList';
import StudentModal from './StudentModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        console.error('Received non-array data:', data);
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (student: any) => {
    try {
      const response = await fetch(`/api/students/${student.id}`);
      if (response.ok) {
        const latestData = await response.json();
        setEditingStudent(latestData);
        setIsModalOpen(true);
      } else {
        console.error('Failed to fetch latest student data');
        setEditingStudent(student);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      setEditingStudent(student);
      setIsModalOpen(true);
    }
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeletingStudentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitStudent = async (studentData: any) => {
    try {
      const method = editingStudent ? 'PUT' : 'POST';
      const url = editingStudent ? `/api/students/${editingStudent.id}` : '/api/students';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });
      
      if (response.ok) {
        fetchStudents();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingStudentId) return;
    
    try {
      const response = await fetch(`/api/students/${deletingStudentId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchStudents();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Student Management</h1>
        <button className="btn-primary" onClick={handleOpenAddModal}>
          + Add Student
        </button>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <StudentList 
          students={students} 
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
        />
      )}

      <StudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmitStudent}
        initialData={editingStudent}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Student?"
        message="Are you sure you want to remove this student? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default StudentPage;
