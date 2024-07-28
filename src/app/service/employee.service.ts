import {MatTableDataSource} from "@angular/material/table";
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
interface Employee {
  id: string;
  name: string;
  typeA: string;
  typeB: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees = new BehaviorSubject<Employee[]>([
    { id: '1', name: 'John Doe', typeA: 'A1', typeB: 'B1' },
    { id: '2', name: 'Jane Smith', typeA: 'A2', typeB: 'B2' }
  ]);

  getEmployees() {
    return this.employees.asObservable();
  }

  addEmployee(employee: Employee) {
    const currentEmployees = this.employees.value;
    this.employees.next([...currentEmployees, employee]);
  }

}
