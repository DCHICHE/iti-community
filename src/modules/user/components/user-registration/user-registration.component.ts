import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _formBuilder: FormBuilder
    ) {
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: this.areEquals('password', 'confirmPassword', 'missmatch')
    });
  }

  ngOnInit(): void {
  }

  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.registerForm.invalid) {
      return;
    }

    // TODO Enregistrer l'utilisateur via le UserService
    this._userService.register(this.registerForm.value.username,this.registerForm.value.password)
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

        abstractControlB.setErrors({[errorKey]: true});
      }
    };
  };
}
