import { Component, OnInit, ErrorHandler } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { User } from './../../_interfaces/user.model';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public errorMessage: string = '';
  public users: User[];

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(){
    let apiAddress: string = "api/users";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.users = res as User[];
    },(error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public getUserDetails(id){
    let detailsUrl: string = `/users/details/${id}`
    this.router.navigate([detailsUrl]);
  }

}
