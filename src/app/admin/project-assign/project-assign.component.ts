import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-assign',
  imports: [FormsModule,CommonModule],
  templateUrl: './project-assign.component.html',
  styleUrl: './project-assign.component.css'
})
export class ProjectAssignComponent {
  projectArray: any[] = [];
  managerArray: any[] = [];
  project_name: string = '';
  project_description: string = '';
  last_date: string = '';
  assigned_to: string = '';
  currentProjectId: string = '';


  constructor(private http: HttpClient, private router: Router) { 
    this.getAllproject();
    this.getAllmanager();
  }

  ngOnInit(): void {}

  getAllproject() {
    this.http.get('http://127.0.0.1:8000/Project_Without_Assign/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.projectArray = resultData?.data || [];
      }
    });
  }

  getAllmanager() {
    this.http.get('http://127.0.0.1:8000/All_Manager/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.managerArray = resultData?.data || [];
      }
    });
  }


  saveOrUpdateRecords() {   
    let bodyData = {
      assigned_to: this.assigned_to,
    };

    if (this.currentProjectId) {
      this.http
        .put('http://127.0.0.1:8000/Project_Assign/' + this.currentProjectId, bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error updating Project');
          }
        );
    } 
  }

  


  setUpdate(data: any) {
    this.project_name = data.project_name;
    this.project_description = data.project_description;
    this.last_date = data.last_date;

    this.currentProjectId = data.project_id; 
    console.log(data.project_id)
  }

  handleApiResponse(resultData: any) {
    if (resultData.hasError) {
      alert(`Error: ${resultData.message}`);
    } else {
      alert(resultData.message || 'Operation successful');
      this.clearForm();
      this.getAllproject();
    }
  }

  clearForm() {
    this.project_name = '';
    this.project_description = '';
    this.last_date = '';
    this.currentProjectId = '';
  }
}
