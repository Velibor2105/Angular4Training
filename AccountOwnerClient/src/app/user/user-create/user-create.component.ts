import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { UserForCreation } from '../../_interfaces/UserForCreation.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public errorMessage: string = '';

  public userForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    })
  }

  public validateControl(controlName: string) {
    return (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched)
  }

  public hasError(controlName: string, errorName: string){
    return (this.userForm.controls[controlName].hasError(errorName))
  }

  public createUser(userFormValue){
    if(this.userForm.valid)
      this.executeUserCreation(userFormValue);
  }

  private executeUserCreation(userFormValue){
    let user: UserForCreation = {
      name: userFormValue.name,
      username: userFormValue.username,
      surname: userFormValue.surname,
      phone: userFormValue.phone,
      address: userFormValue.address
    }

    let apiUrl = 'api/users';
    this.repository.create(apiUrl,user)
    .subscribe(res => {
        $('#successModal').modal();
    },error => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public redirectToUserList(){
    this.router.navigate(['/users/list']);
  }
}
