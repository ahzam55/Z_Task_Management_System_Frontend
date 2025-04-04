import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [CommonModule,RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectArray: any[] = [];


  constructor(private http: HttpClient, private router: Router) { 
    this.getAllproject();
  }

  ngOnInit(): void {}

  getAllproject() {
    this.http.get('http://127.0.0.1:8000/Manager_Project/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.projectArray = resultData?.data || [];
      }
    });
  }

}
