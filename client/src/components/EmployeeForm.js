import React, { useState } from 'react';

const EmployeeForm = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const validate = () => {
    let formErrors = {};
    if (!employee.name) formErrors.name = "Name is required";
    if (!employee.position) formErrors.position = "Position is required";
    if (!employee.department) formErrors.department = "Department is required";
    if (!employee.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!employee.phone) {
      formErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(employee.phone)) {
      formErrors.phone = "Phone number is invalid (should be 10 digits)";
    }
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
        });

        if (response.ok) {
          const newEmployee = await response.json();
          addEmployee(newEmployee.employee);
          setEmployee({
            name: '',
            position: '',
            department: '',
            email: '',
            phone: '',
          });
        } else {
          console.error('Error adding employee');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="form-control"
          required
        />
        {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="position" className="form-label">Position</label>
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
          className="form-control"
          required
        />
        {errors.position && <p style={{color: 'red'}}>{errors.position}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">Department</label>
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          className="form-control"
          required
        />
        {errors.department && <p style={{color: 'red'}}>{errors.department}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          className="form-control"
          required
        />
        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={employee.phone}
          onChange={handleChange}
          className="form-control"
          required
        />
        {errors.phone && <p style={{color: 'red'}}>{errors.phone}</p>}
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default EmployeeForm;
