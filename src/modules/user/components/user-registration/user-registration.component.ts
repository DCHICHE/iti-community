import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../user.model';
import { UserQueries } from '../../services/user.queries';
import { of } from 'rxjs/internal/observable/of';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  public registerForm: FormGroup;
  model = new UserRegistrationFormModel();
  users: User[]

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
  ) {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required, this.validateUsername.bind(this)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: this.areEquals('password', 'confirmPassword', 'missmatch')
      });
  }

  ngOnInit(): void {
  }

  async submit() {

    // DONE  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.registerForm.invalid) {
      return;
    }

    // DONE Enregistrer l'utilisateur via le UserService
    this._userService.register(this.registerForm.value.username, this.registerForm.value.password);
    this.goToLogin();
  }

  goToLogin() {
    this._router.navigate(["splash", "login"]);
  }

  private areEquals = (pathA: string, pathB: string, errorKey: string = 'missmatch') => {
    return (abstractControl: AbstractControl): null | void => {
      const abstractControlA = abstractControl.get(pathA);
      const abstractControlB = abstractControl.get(pathB);

      if (abstractControlA && abstractControlB) {
        const valueA = abstractControlA.value;
        const valueB = abstractControlB.value;

        if (valueA !== null && valueA !== undefined && valueA === valueB) {
          return null;
        }

        abstractControlB.setErrors({ [errorKey]: true });
      }
    };
  };

  //💩💩💩💩💩💩💩💩💩💩💩💩💩
  private validateUsername(control: AbstractControl): ValidationErrors | null {
    if (control.value.length > 0) {
      this._userService.exist(control.value).then( result => {
        if (result === true) {
          control.setErrors( {'usernameAlreadyExists': true});
        }
      } );
    }
    return null;
  }
  //🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢🤢
}
