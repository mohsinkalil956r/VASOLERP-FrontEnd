import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import { entityExistsValidator } from 'src/app/validators/entity-exists.validator';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

 
  isLoading: boolean = false;
  projectId: string | null;
  clientNameLabel: string = 'Client';
  StatusNameLabel: string = 'Status';
  projectData: any = {  
    clientId: '',
    plannedCompletedAt:'',
    name: '',
    description:'',

    startDate: '',
    completionDate : '',
    location:'',
    budget: '',
    statusId:'',
  }

  form: FormGroup = new FormGroup({
    clientId: new FormControl(this.projectData.clientId, [Validators.required]),
    statusId: new FormControl(this.projectData.statusId, [Validators.required]),
    name: new FormControl(this.projectData.name, [Validators.required]),
    description: new FormControl(this.projectData.description, [Validators.required]),
    plannedCompletedAt: new FormControl(this.projectData.plannedCompletedAt, [Validators.required]),
    startDate: new FormControl(this.projectData.startDate, [Validators.required]),
    completionDate: new FormControl(this.projectData.completionDate, [Validators.required]),
    location: new FormControl(this.projectData.location, [Validators.required]),
    budget: new FormControl(this.projectData.budget, [Validators.required]),

  });

  constructor(private service: ProjectsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.projectId = this.route.snapshot.paramMap.get('id');

    if (this.projectId) {

      this.isLoading = true;
      this.service.getById(this.projectId).subscribe(result => {

        this.isLoading = false;
          console.log(result);
        if (!result.isError) {   
          this.projectData.name = result.data.name;  
          this.form.get('name')?.setValue(result.data.name); 
          this.projectData.description = result.data.description;  
          this.form.get('description')?.setValue(result.data.description);       
          this.projectData.plannedCompletedAt = result.data.plannedCompletedAt;
          this.form.get('plannedCompletedAt')?.setValue(formatDate(result.data.plannedCompletedAt, 'yyyy-MM-dd', 'en'));    
          this.projectData.startDate = result.data.startDate;
          this.form.get('startDate')?.setValue(formatDate(result.data.startDate, 'yyyy-MM-dd', 'en'));       
          this.projectData.completionDate = result.data.completionDate;
          this.form.get('completionDate')?.setValue(formatDate(result.data.completionDate, 'yyyy-MM-dd', 'en')); 
          this.projectData.location = result.data.location;
          this.form.get('location')?.setValue(result.data.location);        
          this.projectData.budget = result.data.budget;
          this.form.get('budget')?.setValue(result.data.budget);
          this.projectData.statusId = result.data.statusId;
          this.form.get('statusId')?.setValue(result.data.statusId);
          this.projectData.clientId = result.data.clientId;
          this.form.get('clientId')?.setValue(result.data.clientId);
         
        }
      });
    }
  }



  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.projectId) {
      this.service.update(this.projectId, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/project']);
      });
    }
    else {
      this.service.add(this.form.value).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/admin/project']);
      });
    }
  }
  public cancel(){
    debugger;
    this.router.navigate(['/admin/project']);
  }
  updateClientTypeLabel(newValue: any): void {
    const selectedValue = this.form.controls['clientId'].value;
    if (selectedValue) {
        this.clientNameLabel = '';
    } else {
        this.clientNameLabel = 'Client';
    }
  }
  updateStatusTypeLabel(newValue: any): void {
    const selectedValue = this.form.controls['statusId'].value;
    if (selectedValue) {
        this.StatusNameLabel = '';
    } else {
        this.StatusNameLabel = 'Status';
    }
  }
  uploadingEventHandler(status: boolean): void {
    this.isLoading = status;
  }
}
