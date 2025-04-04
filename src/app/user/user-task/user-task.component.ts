import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-task',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-task.component.html',
  styleUrl: './user-task.component.css'
})
export class UserTaskComponent {
  assignedtaskArray: any[] = [];
  taskstatus: string = '';
  taskfile: File | null = null;
  currentTaskId: string = '';


  constructor(private http: HttpClient, private router: Router) { 
    this.getAllassignedtask();
  }

  ngOnInit(): void {}

  getAllassignedtask() {
    this.http.get('http://127.0.0.1:8000/User_Task/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.assignedtaskArray = resultData?.data || [];
      }
    });
  }

  updateTaskStatus(task: any) {
    this.taskstatus = this.getNextStatus(task.status); 
    this.currentTaskId = task.task_id;

    let bodyData = {
      taskstatus: this.taskstatus,
    };
    console.log('Updating task', bodyData);
    if (this.currentTaskId) {
      this.http
        .put('http://127.0.0.1:8000/Status_Update/' + this.currentTaskId, bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error updating task status');
          }
        );
    }
  }

  onFileSelected(event: any, task: any) {
    if (event.target.files && event.target.files[0]) {
      task.selectedFile = event.target.files[0]; // Store the selected file in the task
    } else {
      task.selectedFile = null; // Reset if no file is selected
    }
  }

  // Handle file upload
  uploadFile(task: any) {
    if (!task.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('taskfile', task.selectedFile); 
    formData.append('currentTaskId', task.task_id.toString());

    // Debugging FormData
    formData.forEach((value, key) => {
      console.log(key, value); // Log the FormData content
    });

    // Make the HTTP POST request with FormData
    this.http.post('http://127.0.0.1:8000/Task_Report/', formData)
      .subscribe(
        (resultData: any) => {
          this.handleApiResponse(resultData); // Handle the API response
          task.selectedFile = null; // Reset the selected file after upload
          alert('File uploaded successfully');
        },
        (error) => {
          console.error(error);
          alert('An error occurred during file upload.');
        }
      );
  }
  
  

  getNextStatus(currentStatus: string): string {
    switch (currentStatus) {
      case 'not_started':
        return 'in_progress';
      case 'in_progress':
        return 'completed';
      case 'completed':
        return 'completed';
      default:
        return currentStatus;
    }
  }

  handleApiResponse(resultData: any) {
    if (resultData.hasError) {
      alert(`Error: ${resultData.message}`);
    } else {
      alert(resultData.message || 'Operation successful');
      this.getAllassignedtask();
    }
  }


}
