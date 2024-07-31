import {RouterOutlet} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent, MatOption} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, take} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
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
import {MatOptionSelectionChange} from "@angular/material/core";

interface Employee {
  id: string;
  name: string;
  typeA: string;
  typeB: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatAutocompleteModule, MatInputModule,
    ReactiveFormsModule, NgFor, MatOption, AsyncPipe, NgIf, MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'employeeName', 'typeA', 'typeB'];
  dataSource = new MatTableDataSource<Employee>();
  formGroup: FormGroup;

  private filteredEmpSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  filteredEmployees: Observable<Employee[]> = this.filteredEmpSubject.asObservable();

  constructor(public dialog: MatDialog,
              public employeeService: EmployeeService) {
  }

  displayNationality(employee: Employee): string {

    return employee ? employee.id : '';
  }


  getFilteredEmployeesLength(): number {
    let length = 0;
    this.filteredEmployees.pipe(take(1)).subscribe(employees => {
      length = employees.length;
    });
    return length;
  }





  ngOnInit() {
    const emp1 = {
      id: '1', name: 'John Doe', typeA: 'A1', typeB: 'B1'
    }
    const emp2 = {
      id: '2', name: 'Jane Smith', typeA: 'A2', typeB: 'B2'
    }
    this.dataSource.data.push(emp1)
    this.dataSource.data.push(emp2)

    this.filteredEmpSubject.next(this.dataSource.data);
    console.log(this.filteredEmployees)
    this.formGroup = new FormGroup({});

    this.dataSource.data.forEach((employee, index) => {
      const empIdControl = new FormControl();
      const empNameControl = new FormControl();

      this.formGroup.addControl('empId_' + index, empIdControl);
      this.formGroup.addControl('empName_' + index, empNameControl);

      this.formGroup.get('empId_' + index)?.setValue(employee.id);
      this.formGroup.get('empName_' + index)?.setValue(employee.name);


    });

  }

  onInputId(empId: string) {
    const value = this.formGroup.get('empId_' + empId)?.value;
    const filData = this.dataSource.data.filter(option => (option.id.toLowerCase().includes(value.toLowerCase())));
    //this.filteredEmpSubject.next(filData);
  }
  onInputName(empName: string) {
    const value = this.formGroup.get('empName_' + empName)?.value;
    const filData = this.dataSource.data.filter(option => (option.name.toLowerCase().includes(value.toLowerCase())));
    //this.filteredEmpSubject.next(filData);
  }

  openAddEmployeeDialog(): void {
    this.formGroup.addControl('empId_' + this.dataSource.data.length, new FormControl('', []));
    this.formGroup.addControl('empName_' + this.dataSource.data.length, new FormControl('', []));

    const newEmployee = {
      id: '',
      name: '',
      typeA: '',
      typeB: '',
    }
    // Create a shallow copy of the data source's data
    const updatedData = this.dataSource.data.slice();
    updatedData.push(newEmployee);

    // Assign the updated data back to the dataSource
    this.dataSource.data = updatedData;
    this.dataSource._updateChangeSubscription();


  }

  onOptionChanges(event: MatOptionSelectionChange, index: number): void {
    console.log(event);

    if (!event.isUserInput) {
      return;
    }

    this.filteredEmployees.pipe(
      map(employees => employees.find(emp => emp.id === event.source.value || emp.name === event.source.value)),
      take(1) // This will ensure the subscription is closed after the first emission
    ).subscribe(selectedEmp => {
      if (selectedEmp) {
        // Create a shallow copy of the data source's data
        const updatedData = this.dataSource.data.slice();

        // Update the specific employee data
        updatedData[index] = {
          ...updatedData[index],
          id: selectedEmp.id,
          name: selectedEmp.name,
          typeA: selectedEmp.typeA,
          typeB: selectedEmp.typeB
        };
        console.log('Updated data', updatedData);

        // Assign the updated data back to the dataSource
        this.dataSource.data = updatedData;
        this.dataSource._updateChangeSubscription();

      } else {
        console.log('No matching employee found.');
      }
    });

    console.log(this.dataSource.data);
  }



  protected readonly onfocus = onfocus;
}
