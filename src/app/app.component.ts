import { RouterOutlet } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent, MatOption} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
export interface Employee {
  id: string;
  name: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatAutocompleteModule, MatInputModule, ReactiveFormsModule, NgFor, MatOption, AsyncPipe,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  title = 'searchEmps';

  constructor(public dialog: MatDialog) { }

  employeeForm: FormGroup;
  employees: Employee[] = [
    { id: 'E001', name: 'John Doe' },
    { id: 'E002', name: 'Jane Smith' },
    { id: 'E003', name: 'Alice Johnson' },
    { id: 'E004', name: 'Bob Brown' }
  ];

  filteredEmployeeIds: Observable<Employee[]>;
  filteredEmployeeNames: Observable<Employee[]>;
  selectedEmployee:Employee;

  ngOnInit() {
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
    this.selectedEmployee = this.employees.filter(emp=> emp.id == selectedId)[0];
    this.employeeForm.get('employeeName')?.setValue(this.selectedEmployee.name);
  }

  onEmployeeNameSelected($event: MatAutocompleteSelectedEvent) {
    const selectedName = $event.option?.value;
    this.selectedEmployee = this.employees.filter(emp=> emp.name == selectedName)[0];
    this.employeeForm.get('employeeId')?.setValue(this.selectedEmployee.id);
  }
}
