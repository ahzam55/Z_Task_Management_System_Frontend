import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-registration',
  imports: [CommonModule,FormsModule],
  templateUrl: './task-registration.component.html',
  styleUrl: './task-registration.component.css'
})
export class TaskRegistrationComponent {
  projectArray: any[] = [];
  taskArray: any[] = [];
  minDate: string = '';
  project_name: string = '';
  task_name: string = '';
  task_description: string = '';
  last_date: string = '';
  is_high_priority: string = '';
  currentTaskId: string = '';


  constructor(private http: HttpClient, private router: Router) { 
    this.getAllproject();
    this.getAlltask();
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; 

  }
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

  getAlltask() {
    this.http.get('http://127.0.0.1:8000/Task_Registration/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.taskArray = resultData?.data || [];
      }
    });
  }


  saveOrUpdateRecords() {
    let bodyData = {
      project_name: this.project_name,
      task_name: this.task_name,
      task_description: this.task_description,
      is_high_priority: this.is_high_priority,
      last_date: this.last_date,
    };

    if (this.currentTaskId) {
      this.http
        .put('http://127.0.0.1:8000/Task_Registration/' + this.currentTaskId, bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error updating Task');
          }
        );
    } else {
      this.http
        .post('http://127.0.0.1:8000/Task_Registration/', bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error registering Task');
          }
        );
    }
  }
 
  setUpdate(data: any) {
    this.project_name = data.project_id;
    this.task_name = data.task_name;
    this.task_description = data.task_description;
    this.is_high_priority = data.is_high_priority;
    this.last_date = data.task_last_date;
  
  

    this.currentTaskId = data.task_id; 
    console.log(data.task_id)
  }

  setDelete(data: any) {
    this.http
      .delete('http://127.0.0.1:8000/Task_Registration/' + data.task_id)
      .subscribe(
        (resultData: any) => {
          this.handleApiResponse(resultData);
        },
        (error) => {
          console.error(error);
          alert('Error deleting Task');
        }
      );
  }

  handleApiResponse(resultData: any) {
    if (resultData.hasError) {
      alert(`Error: ${resultData.message}`);
    } else {
      alert(resultData.message || 'Operation successful');
      this.clearForm();
      this.getAlltask();
    }
  }

  clearForm() {
    this.project_name = '';
    this.task_name = '';
    this.task_description = '';
    this.is_high_priority = '';
    this.last_date = '';
    this.currentTaskId = '';
  }

}
