import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-assign',
  imports: [CommonModule,FormsModule],
  templateUrl: './task-assign.component.html',
  styleUrl: './task-assign.component.css'
})
export class TaskAssignComponent {
  taskArray: any[] = [];
  userArray: any[] = [];
  minDate: string = '';
  project_name: string = '';
  task_name: string = '';
  task_description: string = '';
  last_date: string = '';
  is_high_priority: string = '';
  assigned_to: string = '';
  currentTaskId: string = '';


  constructor(private http: HttpClient, private router: Router) { 
    this.getAlltask();
    this.getAlluser();
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; 

  }

  getAlluser() {
    this.http.get('http://127.0.0.1:8000/All_Employee/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.userArray = resultData?.data || [];
      }
    });
  }


  getAlltask() {
    this.http.get('http://127.0.0.1:8000/Task_Without_Assign/').subscribe((resultData: any) => {
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
      assigned_to: this.assigned_to,
      is_high_priority: this.is_high_priority,

    };
    console.log(bodyData);
    if (this.currentTaskId) {
      this.http
        .put('http://127.0.0.1:8000/Task_Assign/' + this.currentTaskId, bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('User already has 3 high-priority tasks');
          }
        );
    } 
  }
 
  setUpdate(data: any) {
    this.project_name = data.project_name;
    this.task_name = data.task_name;
    this.task_description = data.task_description;
    this.last_date = data.task_last_date;
    this.is_high_priority = data.is_high_priority;
  
  

    this.currentTaskId = data.task_id; 
    console.log(data.task_id)
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
    this.last_date = '';
    this.currentTaskId = '';
  }

}