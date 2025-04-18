import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'] 
})
export class SigninComponent {
  password: string = ''; 
  username: string = ''; 

  constructor(private http: HttpClient, private router: Router) {}

  saveRecords() {
    let bodyData = {
      password: this.password,
      username: this.username,
    };
    console.log(bodyData);

    this.http.post('http://127.0.0.1:8000/Signin/', bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);
        console.log(resultData.data.user_id);

        if (resultData.hasError === false) {
          if (resultData.data && resultData.data.access_token && resultData.data.refresh_token) {
            localStorage.setItem('access_token', resultData.data.access_token);
            localStorage.setItem('refresh_token', resultData.data.refresh_token);
            console.log('Access Token:', resultData.data.access_token);
            console.log('Refresh Token:', resultData.data.refresh_token);
          }

          if (resultData.data && resultData.data.redirect) {
            if (resultData.data.redirect === 'adminhome') {
              this.router.navigate(['admin/adminhome'], { state: { user_id: resultData.data.user_id } });
            } else if (resultData.data.redirect === 'managerhome') {
              this.router.navigate(['manager/managerhome']);
            } else if (resultData.data.redirect === 'userhome') {
              this.router.navigate(['user/userhome']);
            } 
          }
        } else {
          alert(resultData.message || 'An error occurred');
        }
      },
      (error) => {
        console.error('Error occurred', error);

    
        if (error.error && error.error.message) {
          alert(error.error.message); 
        } else {
          alert('An error occurred, please try again later.'); 
        }
      }
    );
  }
}
