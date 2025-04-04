import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-assigned',
  imports: [CommonModule],
  templateUrl: './project-assigned.component.html',
  styleUrl: './project-assigned.component.css'
})
export class ProjectAssignedComponent {
  projectArray: any[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    this.getAllproject();
    
  }

  getAllproject() {
    this.http.get('http://127.0.0.1:8000/Project_With_Assign/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.projectArray = resultData?.data || [];
      }
    });
  }

}
