import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { SplashScreenLayoutComponent } from './layouts/splash-screen-layout/splash-screen-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { RoomPageComponent } from './pages/room-page/room-page.component';

const routes: Routes = [{
  path: "",
  redirectTo: "app",
  pathMatch: "prefix"
}, {
  path: "app",
  canActivate: [AuthenticatedGuard],
  component: AppLayoutComponent,
  children: [{
    path: ":roomId",
    component: RoomPageComponent
  }]

}, {
  path: "splash",
  component: SplashScreenLayoutComponent,
  children: [{
    path: "login",
    component: LoginPageComponent
  }, {
    path: "register",
    component: RegistrationPageComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
