import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BackendService } from './services/backend.service';
import { MockBackendService } from './services/mockBackend.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BACKEND_URL, BACKEND_URL_SOCKETS } from './tokens';
import { SessionService } from './services/session.service';
import { ModalComponent } from './bootstrap/modal/modal.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TabsetSidebarComponent } from './bootstrap/tabset-sidebar/tabset-sidebar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SettingsComponent } from './settings/settings.component';
import { TabsetChatComponent } from './bootstrap/tabset-chat/tabset-chat.component';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './services/socket.service';
import { ModalInvitesComponent } from './bootstrap/modal-invites/modal-invites.component';
import { CanvasComponent } from './canvas/canvas.component';

export const routes: Routes = [
  { path: '',         component: LoginComponent },
  { path: 'signUp',   component: SignUpComponent },
  { path: 'main',     component: DashboardComponent,  canActivate: [AuthGuardService] }
];

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    ModalComponent,
    TabsetSidebarComponent,
    ContactsComponent,
    SettingsComponent,
    TabsetChatComponent,
    ChatComponent,
    ModalInvitesComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers:  [
                BackendService,
                SessionService,
                AuthGuardService,
                SocketService,
                { provide: BACKEND_URL_SOCKETS, useValue: 'https://localhost:3000' },
                { provide: BACKEND_URL, useValue: '' }, // We'll use relative urls with a proxy to the backend.
              ],
  bootstrap:  [AppComponent]
})
export class AppModule { }
