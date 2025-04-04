import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-registration',
  imports: [FormsModule,CommonModule],
  templateUrl: './project-registration.component.html',
  styleUrl: './project-registration.component.css'
})
export class ProjectRegistrationComponent {
  projectArray: any[] = [];
  project_name: string = '';
  project_description: string = '';
  last_date: string = '';
  currentProjectId: string = '';


  constructor(private http: HttpClient, private router: Router) { 
    this.getAllproject();
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

  saveOrUpdateRecords() {
    let bodyData = {
      project_name: this.project_name,
      project_description: this.project_description,
      last_date: this.last_date,
    };

    if (this.currentProjectId) {
      this.http
        .put('http://127.0.0.1:8000/Project_Registration/' + this.currentProjectId, bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error updating Project');
          }
        );
    } else {
      this.http
        .post('http://127.0.0.1:8000/Project_Registration/', bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error registering Project');
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

  setDelete(data: any) {
    this.http
      .delete('http://127.0.0.1:8000/Project_Registration/' + data.project_id)
      .subscribe(
        (resultData: any) => {
          this.handleApiResponse(resultData);
        },
        (error) => {
          console.error(error);
          alert('Error deleting Project');
        }
      );
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
