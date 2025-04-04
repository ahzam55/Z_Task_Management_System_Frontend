import { Routes } from '@angular/router';
import { AdminmasterComponent } from './admin/adminmaster/adminmaster.component';
import { ManagerRegistrationComponent } from './admin/manager-registration/manager-registration.component';
import { EmployeeRegistrationComponent } from './admin/employee-registration/employee-registration.component';
import { GuestmasterComponent } from './guest/guestmaster/guestmaster.component';
import { AdminhomeComponent } from './admin/adminhome/adminhome.component';
import { ManagermasterComponent } from './manager/managermaster/managermaster.component';
import { ManagerhomeComponent } from './manager/managerhome/managerhome.component';
import { UsermasterComponent } from './user/usermaster/usermaster.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { SigninComponent } from './guest/signin/signin.component';
import { ProjectRegistrationComponent } from './admin/project-registration/project-registration.component';
import { AuthGuard } from './auth.guard';
import { ManagerEmployeeRegistrationComponent } from './manager/manager-employee-registration/manager-employee-registration.component';
import { ProjectComponent } from './manager/project/project.component';
import { TaskRegistrationComponent } from './manager/task-registration/task-registration.component';
import { TaskAssignComponent } from './manager/task-assign/task-assign.component';
import { TaskAssignedComponent } from './manager/task-assigned/task-assigned.component';
import { UserTaskComponent } from './user/user-task/user-task.component';
import { WorkLogComponent } from './user/work-log/work-log.component';
import { ProjectAssignComponent } from './admin/project-assign/project-assign.component';
import { ProjectAssignedComponent } from './admin/project-assigned/project-assigned.component';
import { PerformanceReportComponent } from './user/performance-report/performance-report.component';
import { TaskViewComponent } from './admin/task-view/task-view.component';
import { TaskReportViewComponent } from './admin/task-report-view/task-report-view.component';

export const routes: Routes = [

    { 
      path: 'manager', 
      component: ManagermasterComponent,
      canActivate: [AuthGuard],
      data: { role: 'manager' },
      children: [
        { path: 'managerhome', component: ManagerhomeComponent }, 
        { path: 'employeereg', component: ManagerEmployeeRegistrationComponent },
        { path: 'project', component: ProjectComponent },
        { path: 'taskreg', component: TaskRegistrationComponent },
        { path: 'taskassign', component: TaskAssignComponent },
        { path: 'taskassigned', component: TaskAssignedComponent },
      ]
    },
  
    { 
      path: 'user', 
      component: UsermasterComponent,
      canActivate: [AuthGuard],
      data: { role: 'employee' },
      children: [
        { path: 'userhome', component: UserhomeComponent }, 
        { path: 'usertask', component: UserTaskComponent },
        { path: 'worklog', component: WorkLogComponent },
        { path: 'userreport', component: PerformanceReportComponent },
      ]
    },
  
    { 
      path: 'guest', 
      component: GuestmasterComponent,
      children: [
        { path: '', component: SigninComponent },  
      ]
    },
  
  
    { 
      path: 'admin', 
      component: AdminmasterComponent,
      canActivate: [AuthGuard],
      data: { role: 'admin' },
      children: [
        { path: 'adminhome', component: AdminhomeComponent }, 
        { path: 'manager', component: ManagerRegistrationComponent },
        { path: 'employee', component: EmployeeRegistrationComponent }, 
        { path: 'project', component: ProjectRegistrationComponent }, 
        { path: 'project_assign', component: ProjectAssignComponent }, 
        { path: 'project_assigned', component: ProjectAssignedComponent }, 
        { path: 'task_view', component: TaskViewComponent }, 
        { path: 'task_report_view', component: TaskReportViewComponent }, 
      ]
    },
  
    { path: '', redirectTo: '/guest', pathMatch: 'full' } 
  ];
  