import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SharedModule } from '../shared/shared.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';

 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: UserListComponent },
      { path: 'details/:id', component: UserDetailsComponent },
      { path: 'create', component: UserCreateComponent }
    ]),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [UserListComponent, UserDetailsComponent, UserCreateComponent]
})
export class UserModule { }