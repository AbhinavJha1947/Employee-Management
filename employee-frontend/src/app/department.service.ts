import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = 'https://localhost:7203/api/Employees';

  constructor(private http: HttpClient) {}

  getAllDepartments() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}

