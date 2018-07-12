import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { OpenIdConnectService } from './shared/services/open-id-connect.service';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { ContactComponent } from './contact/contact.component';
import { GuardServiceService } from './shared/services/guard-service.service';
import { AddAuthorizationHeaderInterceptor } from './shared/services/add-authorization-header-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent,
    SigninOidcComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, canActivate: [GuardServiceService] },
      { path: 'users', loadChildren: "./user/user.module#UserModule", canActivate: [GuardServiceService]  },
      { path: 'signin-oidc', component: SigninOidcComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [GuardServiceService]  },
      { path: '404', component : NotFoundComponent, canActivate: [GuardServiceService] },
      { path: '500', component: InternalServerComponent, canActivate: [GuardServiceService]  },
      { path: '**', redirectTo: '/404', pathMatch: 'full', canActivate: [GuardServiceService] }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthorizationHeaderInterceptor,
      multi: true
    },
    EnvironmentUrlService, 
    ErrorHandlerService, 
    OpenIdConnectService,
    GuardServiceService 
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
