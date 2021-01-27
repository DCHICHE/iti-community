import { Injectable } from '@angular/core';
import { Bad, Ok } from 'src/modules/common/Result';
import { UserLocalStorage } from 'src/modules/user/services/platform/local/user.storage';
import { AuthenticationCommands, LoginCommandResult, LogoutCommandResult } from '../../authentication.commands';

@Injectable()
export class LocalAuthenticationCommands extends AuthenticationCommands {
  private userStorage: UserLocalStorage = new UserLocalStorage();

  async login(username: string, password: string): Promise<LoginCommandResult> {
    const users = this.userStorage.getValue();
    const userId = Object.keys(users).find(id => users[id].username === username);
    if (!userId) {
      return Bad("invalid_credentials");
    }

    const user = users[userId];
    if (user.password !== password) {
      return Bad("invalid_credentials");
    }

    return Ok({
      user,
      bearer: {
        token: "token",
        expiresAt: 0
      }
    });
  }

  async logout(userId: string): Promise<LogoutCommandResult> {
    return Ok();
  }
}
