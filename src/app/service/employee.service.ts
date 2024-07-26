import {MatTableDataSource} from "@angular/material/table";
import { Injectable } from '@angular/core';
interface Employee {
  id: string;
  name: string;
  typeA:string,
  typeB:string
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees = new MatTableDataSource<Employee>([]);

}
