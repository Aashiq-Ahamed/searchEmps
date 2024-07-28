import {Component, Inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
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
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit{
  employee = { id: 0, name: '', typeA: '', typeB: '' };
  formGroup: FormGroup;
  constructor(public dialogRef: MatDialogRef<EmployeeTableComponent>,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      empId: new FormControl('', [Validators.required]),
      empName: new FormControl('', [Validators.required]),
      typeA: new FormControl('', [Validators.required]),
      typeB: new FormControl('', [Validators.required])
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    const employee = {
      id : this.formGroup.get('empId')?.value,
      name : this.formGroup.get('empName')?.value,
      typeA : this.formGroup.get('typeA')?.value,
      typeB : this.formGroup.get('typeB')?.value
    }


    this.dialogRef.close(employee);
  }

}
