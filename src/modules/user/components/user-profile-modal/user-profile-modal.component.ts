import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, AbstractControl, ValidationErrors, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../user.model';

export class UserProfileForm {
  id: string;
  username: string;
  photoUrl?: string;
  _file?: File;
  user: User;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.photoUrl = user.photoUrl;
    this.user = user;
  }

  get file() {
    return this._file;
  }

  set file(file: File | undefined) {
    this._file = file;
    if (file) {
      this.toBase64(file).then(s => {
        this.photoUrl = s;
      })
    }
  }

  toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  hasChanged(): boolean {
    return !!this.file || this.username !== this.user.username
  }
}

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.less']
})
export class UserProfileModalComponent implements OnInit {
  @Input()
  user: User;

  // @ViewChild("f")
  // form: NgForm;
  supportedTypes = "";
  isVisible: boolean = false;
  userNameExists: boolean = false;
  public form: FormGroup;
  model: UserProfileForm;

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.model = new UserProfileForm(this.user);
    this.form = this.formBuilder.group({
      username: [this.model.username, [Validators.required, this.validateUsername.bind(this)]]
    });
  }

  get photoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.model.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg");
  }

  async onOk() {
    // DONE vérifier si le formulaire est valide
    if (this.form.invalid) return
    if (this.model.hasChanged()) {
      // DONE mettre à jour l'utilisateur via le service
      await this.userService.update({id: this.user.id, username: this.form.value.username, photo: this.model.file});
    }

    this.close();
  }

  onFileUpload = (file: File) => {
    this.model.file = file;
    return false;
  }

  onCancel() {
    this.close();
  }

  open() {
    this.form.reset({username: this.user.username});
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  private validateUsername(control: AbstractControl): ValidationErrors | null {
    if (control.value.length > 0 && control.value !== this.user.username) {
      this.userService.exist(control.value).then( (result: boolean) => {
        if (result === true) {
          control.setErrors( {'usernameAlreadyExists': true});
        }
      } );
    }
    return null;
  }

}
