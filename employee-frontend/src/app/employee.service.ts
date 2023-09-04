import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private baseUrl = 'https://localhost:7203/api/Employees';

  // Add a property to store departments
  departments: any[] = [];

constructor(private http: HttpClient) {
    
  }

  getAllEmployees() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getEmployeeById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.baseUrl, employee);
  }
  
  updateEmployee(employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${employee.id}`, employee);
  }
  
  filterEmployeesByDepartment(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/filter-by-department?departmentId=${departmentId}`);
  }
  
}
