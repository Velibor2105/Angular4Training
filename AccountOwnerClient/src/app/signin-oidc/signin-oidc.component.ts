import { Component, OnInit } from '@angular/core';
import { OpenIdConnectService } from '../shared/services/open-id-connect.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-signin-oidc',
  templateUrl: './signin-oidc.component.html',
  styleUrls: ['./signin-oidc.component.css']
})
export class SigninOidcComponent implements OnInit {

  constructor(private openIdConnectService: OpenIdConnectService, private router: Router) { }

  ngOnInit() {
    this.openIdConnectService.userLoaded$.subscribe((userLoaded) => {
      if(userLoaded){
        this.router.navigate(['./']);
      }else{
        if(!environment.production){
          console.log("An error happend: user wasn't loaded.");
        }
      }
    });

    this.openIdConnectService.handleCallBack();
  }

}
