import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {
  userRole: string;
  userOrganization: string | undefined;

  constructor(private authService: AuthenticationService) {
    this.userRole = authService.getRole();
    this.userOrganization = authService.getUserDetails()?.organization;
  }
}
