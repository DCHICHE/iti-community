import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthenticationService } from '../../services/authentication.service';

class LoginFormModel {
  username = "";
  password = "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public ngForm: FormGroup;

  model = new LoginFormModel();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private nzMessageService: NzMessageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ngForm = this.formBuilder.group(({
      username: new FormControl(this.model.username, Validators.compose([Validators.required])),
      password: new FormControl(this.model.password, Validators.compose([Validators.required]))
    }))
  }

  goToRegistration() {
    this.router.navigate(["splash", "register"]);
  }

  submit(login: LoginFormModel) {
    this.login(login);
  }

  async login(login: LoginFormModel) {
    if (this.ngForm.invalid) {
      return;
    }
    this.router.navigate(["/"]);

    try {
      // TODO vérifier le résultat de l'authentification. Rediriger sur "/" en cas de succès ou afficher une erreur en cas d'échec
      var authenticate = await this.authService.authenticate(login.username, login.password);
      if (authenticate.success) {
        Notification.requestPermission(function (status) {
        });
        this.router.navigate(["/"]);
      } else {
        // this.nzMessageService.error(authenticate.reason);
        this.nzMessageService.error("Le nom ou le mot de passe de l'utilisateur est incorrect");
      }

    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }
}
