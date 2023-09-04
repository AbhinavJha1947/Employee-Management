// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../employee.service';
// import { ActivatedRoute } from '@angular/router';
// import { Employee } from '../Models/employee.model';

// @Component({
//   selector: 'app-add-employee',
//   templateUrl: './add-employee.component.html',
//   styleUrls: ['./add-employee.component.css'],
// })
// export class AddEmployeeComponent implements OnInit {
//   [x: string]: any;
//   employee: any = {
//     name: 'string',
//     gender: 'string',
//     departmentId: 0,
//   };
//   departments: any = {};

//   constructor(
//     private employeeService: EmployeeService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.employeeService.getAllEmployees().subscribe((data) => {
//       this.departments = data;
//     });
//     this.route.params.subscribe((params) => {
//       const departmentId = +params['id'];
//       if (departmentId) {
//         this.employeeService.filterEmployeesByDepartment(departmentId).subscribe((data) => {
//           this.employee = data;
//         });
//       }
//     });
//   }

//   submitForm(): void {
//     if (this.employee.id === 0) {
//       this.employeeService.addEmployee(this.employee).subscribe(() => {
//           console.log('Employee added successfully');
//         });
//     }
//     else {
//       this.employeeService.updateEmployee(this.employee).subscribe(() => {
//         console.log('Employee updated successfully');
//       });
//     }
//   }
// }

// // addEmployee(this.employee).subscribe(() => {
// //   console.log('Employee added successfully');
// // });




import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../Models/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employee: any = {
    name: 'string',
    gender: 'string',
    departmentId: 0,
  };
  departments: any = {};

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private httpClient: HttpClient // Add this line to inject HttpClient
  ) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.departments = data;
    });
    this.route.params.subscribe((params) => {
      const departmentId = +params['id'];
      if (departmentId) {
        this.employeeService.filterEmployeesByDepartment(departmentId).subscribe((data) => {
          this.employee = data;
        });
      }
    });
  }

  submitForm(): void {
    // Make an HTTP POST request to your API endpoint to add or update an employee
    if (this.employee.id === 0) {
      this.httpClient
        .post('https://localhost:7203/api/Employees', this.employee)
        .subscribe(
          (response) => {
            console.log('Employee added successfully:', response);
            // You can also redirect or perform other actions here
          },
          (error) => {
            console.error('Error adding employee:', error);
          }
        );
    } else {
      // Make an HTTP PUT request to update the employee
      this.httpClient
        .put(`https://localhost:7203/api/Employees/${this.employee.id}`, this.employee)
        .subscribe(
          (response) => {
            console.log('Employee updated successfully:', response);
            // You can also redirect or perform other actions here
          },
          (error) => {
            console.error('Error updating employee:', error);
          }
        );
    }
  }
}
