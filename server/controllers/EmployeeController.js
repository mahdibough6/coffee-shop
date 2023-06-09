const db = require('../models');
const Employee = db.Employee;

const EmployeeController = {
  // create employee
  async create(req, res) {
  console.log(req.body);
    try {
      const employee = await Employee.create(req.body);
      res.status(201).json({ employee });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get all employees
  async getAll(req, res) {
    try {
      const employees = await Employee.findAll();
      res.status(200).json({ employees });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // get employee by id
  async getById(req, res) {
    const id = req.params.id;
    try {
      const employee = await Employee.findOne({ where : { id } });
      if (employee) {
        res.status(200).json({ employee });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

 // update employee by id
 async update(req, res) {
      const id = req.params.id;
      try {
        const employee = await Employee.findOne({ where : { id } });
        if (employee) {
          const updatedEmployee = await employee.update(req.body);
          res.status(200).json({ employee: updatedEmployee });
        } else {
          res.status(404).json({ message: 'Employee not found' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      }
 },

  // delete employee by id
  async delete(req, res) {
    const id = req.params.id;
    try {
      const employee = await Employee.findOne({ where : { id } });
      if (employee) {
        await employee.destroy();
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = EmployeeController;
