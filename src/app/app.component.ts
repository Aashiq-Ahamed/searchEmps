import { RouterOutlet } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatAutocompleteModule, MatInputModule, ReactiveFormsModule, NgFor, MatOption, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  title = 'searchEmps';

  constructor(public dialog: MatDialog) { }

  employeeForm: FormGroup;
  employeeIds: string[] = ['E001', 'E002', 'E003', 'E004'];
  employeeNames: string[] = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];

  filteredEmployeeIds: Observable<string[]>;
  filteredEmployeeNames: Observable<string[]>;

  ngOnInit() {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(''),
      employeeName: new FormControl('')
    });

    this.filteredEmployeeIds = this.employeeForm.get('employeeId')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterIds(value))
    );

    this.filteredEmployeeNames = this.employeeForm.get('employeeName')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterNames(value))
    );
  }

  private _filterIds(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.employeeIds.filter(id => id.toLowerCase().includes(filterValue));
  }

  private _filterNames(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.employeeNames.filter(name => name.toLowerCase().includes(filterValue));
  }
}
