import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { User } from './../../_interfaces/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: User[];

  constructor(private repository: RepositoryService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers(){
    let apiAddress: string = "api/users";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.users = res as User[];
    })
  }

}
