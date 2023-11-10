 import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/user/register-user.model';
import { UsersService } from 'src/app/services/users.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  isLoading: boolean = false;
  userId: string | null;
  public userData: RegisterUser = new RegisterUser();
  companies: any[];
  selectedUserType: string = ''; // Initialize with an empty string
  labelPlaceholder: string = 'User Type'; // Placeholder text for the label
  labelPlaceholder1: string = 'company';
  selectedcompany: string = ''; 
 
  ngOnInit() {
    
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.labelPlaceholder=''
      this.labelPlaceholder1=''
      this.isLoading = true;
      this.userService.getById(this.userId).subscribe(value => {

        this.isLoading = false;

        if (!value.isError) {
          this.userData.userType = value.data.userType;
          this.userData.email = value.data.email;
          this.userData.firstName = value.data.firstName;
          this.userData.lastName = value.data.lastName;
          this.userData.phoneNumber = value.data.phoneNumber;
          this.userData.permissions = value.data.permissions;
        }

        

        this.registerForm = new FormGroup({
          userType: new FormControl(this.userData.userType),
          email: new FormControl(this.userData.email, { validators: [Validators.email, Validators.required]}),
          firstName: new FormControl(this.userData.firstName, [Validators.required]),
          lastName: new FormControl(this.userData.lastName, [Validators.required]),
          phoneNumber: new FormControl(this.userData.phoneNumber),
          permissions: new FormArray(this.userData.permissions.map(p => new FormControl(p)), Validators.required)
        });
      });
    }
    
      this.registerForm = new FormGroup({
        userType: new FormControl(this.userData.userType),
        email: new FormControl(this.userData.email, { validators: [Validators.email, Validators.required], asyncValidators: [entityExistsValidator(this.userService)], updateOn: 'blur'}),
        firstName: new FormControl(this.userData.firstName, [Validators.required]),
        lastName: new FormControl(this.userData.lastName, [Validators.required]),
        phoneNumber: new FormControl(this.userData.phoneNumber),
        permissions: new FormArray([], Validators.required)
      });
    

    
  }

  registerForm: FormGroup;

  constructor(private userService: UsersService, private route: ActivatedRoute, private router: Router) { }

  onSubmit() {
    

    if (this.userId) {
      this.isLoading = true;
      debugger
      this.userService.update(this.userId, this.registerForm.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/user-list']);
      });
    }
    else {
      this.isLoading = true;
      debugger
      this.userService.add(this.registerForm.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/user-list']);
      });
    }
  }
  updateLabel(event: any) {
    debugger
    // Update the label when an option is selected
    this.selectedUserType = event.target.value;
    if(this.selectedUserType==='Admin'){
    
    
    }
   
  }
  onCheckChange(event: any) {
    
    const formArray: FormArray = this.registerForm.get('permissions') as FormArray;

    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: any) => {
        
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }
}
