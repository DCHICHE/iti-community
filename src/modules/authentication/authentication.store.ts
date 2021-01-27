import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Store } from '../common/Store';
import { AuthenticationState } from './authentication.state';
import { AuthenticationStorage } from './authentication.storage';

/**
 * Manage the state of the Authentication module
 */
@Injectable()
export class AuthenticationStore extends Store<AuthenticationState | null> {
  accessToken$: Observable<string | undefined>;
  constructor(
    private readonly storage: AuthenticationStorage
  ) {
    super(storage.getValue());

    this.value$.subscribe(state => {
      this.storage.setValue(state);
    });
    this.accessToken$ = this.get(s => s ? s.accessToken : undefined).pipe(distinctUntilChanged());
  }

  get accessToken(): string | null {
    return this.value ? this.value.accessToken : null;
  }

  get isAuthenticated(): boolean {
    return !!this.value;
  }
}
