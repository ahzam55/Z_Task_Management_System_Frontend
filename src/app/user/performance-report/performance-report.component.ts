import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performance-report',
  imports: [CommonModule],
  templateUrl: './performance-report.component.html',
  styleUrls: ['./performance-report.component.css']
})
export class PerformanceReportComponent {
  ReportArray: any[] = [];
  employeeName: string = '';
  employeeId: string = '';
  reportDate: Date = new Date(); 
  totalCompletedTasks: number = 0;  
  totalPendingTasks: number = 0;    
  performanceLevel: string = 'Good'; 

  constructor(private http: HttpClient, private router: Router) { 
    this.getPerformanceReport();
  }

  ngOnInit(): void {
    
  }

  getPerformanceReport() {
    this.http.get('http://127.0.0.1:8000/Performance_Report/').subscribe((resultData: any) => {
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        const data = resultData?.data || {};
        this.totalCompletedTasks = data.completedTasksCount || 0;
        this.totalPendingTasks = data.pendingTasksCount || 0;
        this.employeeName = data.username || 'Employee Name'; 
        this.employeeId = data.user_id || 'Employee ID';      
      }
    });
  }
}
