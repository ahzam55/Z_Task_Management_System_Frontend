import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-managermaster',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './managermaster.component.html',
  styleUrl: './managermaster.component.css'
})
export class ManagermasterComponent {
  constructor(private router: Router) {}

  logout() {
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    

    sessionStorage.clear();

    this.router.navigate(['/']);
  }

}
