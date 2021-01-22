import { ViewChild } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/modules/authentication/services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../user.model';
import { UserStore } from '../../user.store';
import { UserProfileModalComponent } from '../user-profile-modal/user-profile-modal.component';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.less']
})
export class UserWidgetComponent implements OnInit {
  @Output()
  toggleNotifications: EventEmitter<void> = new EventEmitter();

  @ViewChild("modal")
  modal: UserProfileModalComponent;

  user$: Observable<User | undefined>;

  currentUser: User | undefined;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private modalService: NzModalService,
    private userService: UserService,
    private store: UserStore
  ) {
    this.user$ = store.user$;
    this.user$.subscribe((usr: any) => this.currentUser = usr);
  }

  ngOnInit(): void {
    if (this.currentUser?.photoUrl) {
      const element = document.getElementsByClassName('user-widget-photo');
      if (element) {
        element[0].setAttribute("style",'background-image:url(' + this.currentUser.photoUrl + ')')
      }
    }
  }

  fireToggleNotificaions() {
    this.toggleNotifications.emit();
  }

  logout() {
    this.modalService.confirm({
      nzTitle: "Déconnexion",
      nzContent: "Êtes-vous sûr(e) de vouloir déconnecter votre session ?",
      nzOkText: "Déconnexion",
      nzOnOk: async () => {
        // DONE logout puis rediriger vers "/splash/login"
        await this.authService.logout();
        await this.router.navigate(['splash', 'login']);
      }
    });
  }
}
