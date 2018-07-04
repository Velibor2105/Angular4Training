import { Component, OnInit } from '@angular/core';
import { User } from '../../_interfaces/user.model';
import { RepositoryService } from '../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User;
  public errorMessage: string = '';
  constructor(private repository: RepositoryService, private router: Router, 
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/users/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.user = res as User;
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

}
