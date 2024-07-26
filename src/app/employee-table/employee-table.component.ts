import {Component, Inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Observable} from "rxjs";

import {map, startWith} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogClose} from "@angular/material/dialog";
import {EmployeeService} from "../service/employee.service";
import {MatButton} from "@angular/material/button";

interface Employee {
  id: string;
  name: string;
}
@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit{
  employeeForm: FormGroup;
  employees: Employee[] = [
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
    { id: 'E003', name: 'Alice Johnson' },
    { id: 'E004', name: 'Bob Brown' }
  ];

  filteredEmployeeIds: Observable<Employee[]>;
  filteredEmployeeNames: Observable<Employee[]>;
  selectedEmployee: Employee;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public empService:EmployeeService) {
  }

  ngOnInit() {
    console.log(this.data)
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(''),
      employeeName: new FormControl('')
    });

    this.filteredEmployeeIds = this.employeeForm.get('employeeId')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'id'))
    );

    this.filteredEmployeeNames = this.employeeForm.get('employeeName')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'name'))
    );

  }

  private _filter(value: string, field: 'id' | 'name'): Employee[] {
    const filterValue = value.toLowerCase();
    return this.employees.filter(employee => employee[field].toLowerCase().includes(filterValue));
  }

  onEmployeeIdSelected($event: MatAutocompleteSelectedEvent) {
    console.log($event);
    const selectedId = $event.option?.value;
    this.selectedEmployee = this.employees.filter(emp => emp.id == selectedId)[0];
    this.employeeForm.get('employeeName')?.setValue(this.selectedEmployee.name);
  }

  onEmployeeNameSelected($event: MatAutocompleteSelectedEvent) {
    const selectedName = $event.option?.value;
    this.selectedEmployee = this.employees.filter(emp => emp.name == selectedName)[0];
    this.employeeForm.get('employeeId')?.setValue(this.selectedEmployee.id);
  }
  onSave(){
    const index = this.data;
    const empId = this.employeeForm.get('employeeId')?.value;
    const empName = this.employeeForm.get('employeeName')?.value;

    this.empService.employees.data[index].id = empId;
    this.empService.employees.data[index].name = empName;
  }

}
