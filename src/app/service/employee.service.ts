import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Ensure you have an Employee model

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
  private apiUrl = 'http://localhost:3000/employees'; // Your dummy API endpoint

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
