const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let employees = [];

app.post('/api/employees', (req, res) => {
  const { name, position, department, email, phone } = req.body;
  const date = new Date();

  const employee = {
    id: uuidv4(),
    name,
    position,
    department,
    email,
    phone,
    entryDate: date.toLocaleDateString(),
    entryTime: date.toLocaleTimeString(),
    exitDate: null,
    exitTime: null,
  };

  employees.push(employee);
  console.log('Employee added:', employee);
  res.status(201).json({ message: 'Employee saved successfully', employee });
});

app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.get('/api/employees/name/:name', (req, res) => {
  const { name } = req.params;
  const employee = employees.find(emp => emp.name.toLowerCase() === name.toLowerCase());
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, department, email, phone } = req.body;
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    employee.name = name;
    employee.position = position;
    employee.department = department;
    employee.email = email;
    employee.phone = phone;
    console.log('Employee updated:', employee);
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.put('/api/employees/:id/exit', (req, res) => {
  const { id } = req.params;
  const date = new Date();
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    employee.exitDate = date.toLocaleDateString();
    employee.exitTime = date.toLocaleTimeString();
    console.log('Employee exit updated:', employee);
    res.status(200).json({ message: 'Employee exit time updated successfully', employee });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== id);
  console.log('Employee deleted:', id);
  res.status(200).json({ message: 'Employee deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Employee API');
});
