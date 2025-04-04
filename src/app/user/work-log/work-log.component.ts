import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-log',
  imports: [CommonModule,FormsModule],
  templateUrl: './work-log.component.html',
  styleUrl: './work-log.component.css'
})
export class WorkLogComponent {
  WorkLogArray: any[] = [];
  work_log_time: number = 0;
  work_log_description: string = '';
  workLogTimeError: boolean = false;
  descriptionError: boolean = false;

  constructor(private http: HttpClient, private router: Router) { 
    this.getAllWorkLog();
  }

  validateWorkLogTime() {
    if (this.work_log_time > 8) {
      this.workLogTimeError = true;
    } else {
      this.workLogTimeError = false;
    }
  }

  validateDescription() {
    if (this.work_log_description && this.work_log_description.length < 20) {
      this.descriptionError = true;
    } else {
      this.descriptionError = false;
    }
  }

  
  isFormValid(): boolean {
    return !this.workLogTimeError && 
           !this.descriptionError && 
           this.work_log_time > 0 && 
           this.work_log_description.length >= 20;  
  }

  
  getAllWorkLog() {
    this.http.get('http://127.0.0.1:8000/Work_Log_Registration/').subscribe((resultData: any) => {
      if (resultData?.hasError) {
        alert(resultData.message);
      } else {
        this.WorkLogArray = resultData?.data || [];
      }
    });
  }

  
  saveRecords() {
    if (this.isFormValid()) {
      let bodyData = {
        work_log_time: this.work_log_time,
        work_log_description: this.work_log_description,
      };

     
      this.http.post('http://127.0.0.1:8000/Work_Log_Registration/', bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Total work log time exceeds 8 hours for the current date');
          }
        );
    } else {
      alert('Please fix the errors before submitting.');
    }
  }

  handleApiResponse(resultData: any) {
    if (resultData.hasError) {
      alert(`Error: ${resultData.message}`);
    } else {
      alert(resultData.message || 'Work log added successfully');
      this.clearForm();
      this.getAllWorkLog();
    }
  }

  clearForm() {
    this.work_log_time = 0;
    this.work_log_description = '';
  }
}
