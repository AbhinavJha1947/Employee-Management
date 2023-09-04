import { Department } from "./department.model";

// employee.model.ts
export interface Employee {
    id: number;
    name: string;
    gender: string;
    departmentId: number;
    department: Department; // Reference to the Department model
  }
  