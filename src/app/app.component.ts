import { RouterOutlet } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule, MatAutocompleteSelectedEvent, MatOption } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {EmployeeTableComponent} from "./employee-table/employee-table.component";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {EmployeeService} from "./service/employee.service";
interface Employee {
  id: string;
  name: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatAutocompleteModule, MatInputModule,
    ReactiveFormsModule, NgFor, MatOption, AsyncPipe, NgIf, MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','typeA','typeB', 'actions'];


  constructor(public dialog: MatDialog,
              public empService :EmployeeService) { }

  // employees: Employee[] = [
  //   { id: 'E001', name: 'John Doe' },
  //   { id: 'E002', name: 'Jane Smith' },
  //   { id: 'E003', name: 'Alice Johnson' },
  //   { id: 'E004', name: 'Bob Brown' }
  // ];


  ngOnInit() {
    this.empService.employees.data.push({ id: 'E001', name: 'John Doe', typeA: 'test1', typeB:'test1'},
      { id: 'E002', name: 'Jane Smith', typeA: 'test1', typeB:'test1' },
      { id: 'E003', name: 'Alice Johnson',typeA: 'test1', typeB:'test1' },
      { id: 'E004', name: 'Bob Brown', typeA: 'test1', typeB:'test1'})
  }

  openEditPopup(index: number): void {
    const dialogRef = this.dialog.open(EmployeeTableComponent, {
      width: '250px',
      data: index
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
