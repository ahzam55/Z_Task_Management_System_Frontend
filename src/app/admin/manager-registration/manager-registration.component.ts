import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../master.service';

@Component({
  selector: 'app-manager-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './manager-registration.component.html',
  styleUrl: './manager-registration.component.css'
})
export class ManagerRegistrationComponent {
  managerArray: any[] = [];
  password: string = '';
  username: string = '';
  email: string = '';
  role: string = 'manager';
  currentUserId: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { 
    this.getAllmanager();
  }

  ngOnInit(): void {}

  getAllmanager() {
    this.http.get('http://127.0.0.1:8000/Manager/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.managerArray = resultData?.data || [];
      }
    });
  }

  saveRecords() {
    const bodyData = {
      password: this.password,
      username: this.username,
      email: this.email,
      role: this.role,
    };

    console.log(bodyData);

    this.http.post('http://127.0.0.1:8000/Manager/', bodyData).subscribe((resultData: any) => {
      console.log(resultData);

      if (resultData?.hasError) {
        alert(`Error: ${resultData.message}`);
      } else {
        alert('Manager Registered Successfully');
        this.clearForm();
        this.getAllmanager();  
      }
    }, (error) => {
      console.error('Error occurred:', error);
      alert('An error occurred while registering the manager.');
    });
  }

  
  clearForm() {
    this.password = '';
    this.username = '';
    this.email = '';
  }
}
