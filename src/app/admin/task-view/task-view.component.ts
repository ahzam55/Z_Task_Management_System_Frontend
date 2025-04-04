import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  imports: [CommonModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  taskArray: any[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    this.getAlltask();
    
  }

  getAlltask() {
    this.http.get('http://127.0.0.1:8000/Task_View/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.taskArray = resultData?.data || [];
      }
    });
  }

}
