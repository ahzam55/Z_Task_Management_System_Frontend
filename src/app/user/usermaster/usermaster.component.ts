import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usermaster',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './usermaster.component.html',
  styleUrl: './usermaster.component.css'
})
export class UsermasterComponent {

  constructor(private router: Router) {}
  logout() {
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    

    sessionStorage.clear();

    this.router.navigate(['/']);
  }


}
