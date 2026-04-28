import React, { useState, useEffect } from 'react';
import StudentList from './StudentList';
import AddStudentModal from './AddStudentModal';

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAddStudent = async (newStudent: any) => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
      if (response.ok) {
        fetchStudents();
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Student Management</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Student
        </button>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <StudentList students={students} />
      )}

      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddStudent} 
      />
    </div>
  );
};

export default StudentPage;
