import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../employee.service'; // Import EmployeeService
import { DepartmentService } from '../department.service'; // Import DepartmentService
import { Employee } from '../Models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  departments: any[] = [];
  selectedDepartment: number | null = null;
  filteredEmployees: any[] = [];

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService, // Inject EmployeeService
    private departmentService: DepartmentService // Inject DepartmentService
  ) {}

  ngOnInit(): void {
    // Fetch employees using EmployeeService
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data; // Initialize filteredEmployees
    });

    // Fetch departments using DepartmentService
    this.departmentService.getAllDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  // Modify the filterEmployees method
  filterEmployees(): void {
    if (this.selectedDepartment === null) {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter(
        (employee) => employee.departmentId === this.selectedDepartment
      );
    }
  }

  // Modify the getDepartmentName method
  getDepartmentName(departmentId: number): string {
    const department = this.departments.find((dept) => dept.id === departmentId);
    return department ? department.name : 'N/A';
  }
  get maleEmployeeCount(): number {
    return this.employees.filter((employee) => employee.gender === 'Male').length;
  }

  get femaleEmployeeCount(): number {
    return this.employees.filter((employee) => employee.gender === 'Female').length;
  }
}
