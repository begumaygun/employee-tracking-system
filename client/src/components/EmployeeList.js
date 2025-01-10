import React, { useState } from 'react';

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employee, setEmployee] = useState(null);
  const [searchError, setSearchError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
        setSearchError('');
      } else {
        setSearchError('Employee not found');
        setEmployee(null);
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      setSearchError('Error fetching employee');
      setEmployee(null);
    }
  };

  const handleExit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}/exit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedEmployee = await response.json();
        setEmployee(updatedEmployee.employee);
      } else {
        console.error('Error updating employee exit time');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by ID or name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchError && <p style={{color: 'red'}}>{searchError}</p>}
      {employee && (
        <div>
          <h2>Employee Details</h2>
          <p>Name: {employee.name}</p>
          <p>Email: {employee.email}</p>
          <p>Position: {employee.position}</p>
          <p>Department: {employee.department}</p>
          <p>Phone: {employee.phone}</p>
          <p>Entry Date: {employee.entryDate}</p>
          <p>Entry Time: {employee.entryTime}</p>
          <p>Exit Date: {employee.exitDate || 'N/A'}</p>
          <p>Exit Time: {employee.exitTime || 'N/A'}</p>
          {!employee.exitDate && (
            <button onClick={() => handleExit(employee.id)}>Exit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
