import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from '../department.service'; // Import DepartmentService

@Component({
  selector: 'app-filter-employee',
  templateUrl: './filter-employee.component.html',
  styleUrls: ['./filter-employee.component.css'],
})
export class FilterEmployeeComponent implements OnInit { // Implement OnInit interface
  departments: any[] = [];
  selectedDepartment: number | null = null;
  filteredEmployees: any[] = [];

  constructor(private http: HttpClient, private departmentService: DepartmentService) {} // Inject DepartmentService

  ngOnInit(): void {
    // Fetch departments using DepartmentService
    this.departmentService.getAllDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  filterEmployees(): void {
    if (this.selectedDepartment === null) {
      this.filteredEmployees = [];
      return;
    }

    // Filter employees by department using EmployeeService
    this.http
      .get<any[]>(`https://localhost:7203/api/Employees/filter-by-department?departmentId=${this.selectedDepartment}`)
      .subscribe((data) => {
        this.filteredEmployees = data;
      });
  }
}
