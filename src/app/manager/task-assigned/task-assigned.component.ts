import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-assigned',
  imports: [CommonModule],
  templateUrl: './task-assigned.component.html',
  styleUrl: './task-assigned.component.css'
})
export class TaskAssignedComponent {
  assignedtaskArray: any[] = [];


  constructor(private http: HttpClient, private router: Router) { 
    this.getAllassignedtask();
  }

  ngOnInit(): void {}

  getAllassignedtask() {
    this.http.get('http://127.0.0.1:8000/Task_With_Assign/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.assignedtaskArray = resultData?.data || [];
      }
    });
  }

}
