import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-report-view',
  imports: [CommonModule],
  templateUrl: './task-report-view.component.html',
  styleUrl: './task-report-view.component.css'
})
export class TaskReportViewComponent {
  taskArray: any[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    this.getAlltask();
    
  }

  getAlltask() {
    this.http.get('http://127.0.0.1:8000/Task_Report_View/').subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.taskArray = resultData?.data || [];
      }
    });
  }


  getReportUrl(report_file: string): void {
    const baseUrl = 'http://127.0.0.1:8000';  
  
    this.http.get(`${baseUrl}${report_file}`, { responseType: 'blob' }).subscribe(
      (response) => {
  
        const reportUrl = URL.createObjectURL(response);
  
        window.open(reportUrl, '_blank');
      },
      (error) => {
        console.error('Error fetching report:', error);
      }
    );
  }
  
  
  
  
  

}
