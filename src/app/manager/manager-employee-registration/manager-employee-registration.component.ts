import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../master.service';

@Component({
  selector: 'app-manager-employee-registration',
  imports: [FormsModule, CommonModule],
  templateUrl: './manager-employee-registration.component.html',
  styleUrl: './manager-employee-registration.component.css'
})
export class ManagerEmployeeRegistrationComponent {
  employeeArray: any[] = [];
  password: string = '';
  username: string = '';
  email: string = '';
  role: string = 'employee';
  currentUserId: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.getAllemployee();
  }

  ngOnInit(): void {

  }

  
  

  saveRecords(): void {
    const bodyData = {
      password: this.password,
      username: this.username,
      email: this.email,
      role: this.role,
    };

    console.log('Saving employee data:', bodyData);

    this.http.post('http://127.0.0.1:8000/Employee/', bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        if (resultData.hasError) {
          alert('Failed to register employee: ' + resultData.message);
        } else {
          alert('Employee Registered Successfully');
        }
      },
      (error) => {
        console.error('Error saving employee:', error);
        alert('Error registering employee.');
      }
    );
  }

  getAllemployee(): void {
    this.http.get('http://127.0.0.1:8000/Employee/').subscribe(
      (resultData: any) => {
        console.log(resultData);
        this.employeeArray = resultData.data || []; 
      },
      (error) => {
        console.error('Error fetching employees:', error);
        alert('Error fetching employee data.');
      }
    );
  }
}

