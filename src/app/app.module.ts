import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SplashScreenLayoutComponent } from './layouts/splash-screen-layout/splash-screen-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { UserModule } from 'src/modules/user/user.module';
import { FeedModule } from 'src/modules/feed/feed.module';
import { RoomModule } from 'src/modules/room/room.module';
import { InputModule } from 'src/modules/input/input.module';
import { RoomPageComponent } from './pages/room-page/room-page.component';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { SocketIoWebsocketConnection } from 'src/modules/common/SocketIoWebsocketConnection';
import { WebSocketTopic } from 'src/modules/common/WebSocketTopic';
const ws = new SocketIoWebsocketConnection();

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SplashScreenLayoutComponent,
    AppLayoutComponent,
    RegistrationPageComponent,
    RoomPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    UserModule,
    FeedModule,
    RoomModule,
    InputModule,
    FormsModule,
    NotificationModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzButtonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }, {
    provide: WebsocketConnection,
    useValue: ws
  }, WebSocketTopic],
  bootstrap: [AppComponent]
})
export class AppModule { }
