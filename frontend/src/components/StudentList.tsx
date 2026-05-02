
import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  dob: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  enrollment_date: string;
  tuition_due_date: string;
  renewal_date: string;
}

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

type SortField = keyof Student;
type SortOrder = 'asc' | 'desc';

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete }) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortOrder === 'asc' ? '🔼' : '🔽';
  };

  const calculateAge = (dob: string) => {
    if (!dob) return '-';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const isRenewalDue = (dateStr: string) => {
    if (!dateStr) return false;
    const renewalDate = new Date(dateStr);
    const now = new Date();
    const diffTime = renewalDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 30; // Warning if less than 30 days
  };

  const isDueSoon = (dateStr: string) => {
    if (!dateStr) return false;
    const dueDate = new Date(dateStr);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Warning if 7 days or less (including overdue)
  };

  return (
    <div className="table-container">
      <table className="staff-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {getSortIcon('name')}</th>
            <th onClick={() => handleSort('dob')}>Age {getSortIcon('dob')}</th>
            <th>Parent</th>
            <th>Contact</th>
            <th onClick={() => handleSort('tuition_due_date')}>Tuition Due {getSortIcon('tuition_due_date')}</th>
            <th onClick={() => handleSort('renewal_date')}>Renewal {getSortIcon('renewal_date')}</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{calculateAge(student.dob)} ({student.dob || '-'})</td>
              <td>{student.parent_name || '-'}</td>
              <td style={{ fontSize: '0.85rem' }}>
                <div>{student.parent_email}</div>
                <div style={{ opacity: 0.6 }}>{student.parent_phone}</div>
              </td>
              <td className={isDueSoon(student.tuition_due_date) ? 'warning' : ''}>
                {student.tuition_due_date || '-'}
              </td>
              <td className={isRenewalDue(student.renewal_date) ? 'warning' : ''}>
                {student.renewal_date || '-'}
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="action-btn edit" 
                    onClick={() => onEdit(student)}
                    title="Edit Record"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete" 
                    onClick={() => onDelete(student.id)}
                    title="Delete Record"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
