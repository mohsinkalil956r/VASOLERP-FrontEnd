import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss']
})
export class ProfileWidgetComponent implements OnInit {

  userDetails: UserModel = new UserModel();

   constructor(private authService: AuthenticationService, private userService: UsersService, private route: ActivatedRoute) {
    
   }

   ngOnInit(): void {

     let userId = this.route.snapshot.paramMap.get('id') ?? this.authService.getUserDetails()?.id;

    if (userId) {
      this.userService.getById(userId).subscribe(value => {
        this.userDetails = value.data;
        debugger;
      });
    }
  }

}
