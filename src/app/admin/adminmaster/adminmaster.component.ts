import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminmaster',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './adminmaster.component.html',
  styleUrl: './adminmaster.component.css'
})
export class AdminmasterComponent {
  constructor(private router: Router) {}

  logout() {
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    

    sessionStorage.clear();

    this.router.navigate(['/']);
  }
}
