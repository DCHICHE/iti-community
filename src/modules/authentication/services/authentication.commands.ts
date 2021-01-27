import { Injectable } from '@angular/core';
import { Bad, Ok, OkVal } from 'src/modules/common/Result';
import { User } from 'src/modules/user/user.model';

export type LoginCommandResult =
  | OkVal<LoginCommandData>
  | Bad<"invalid_credentials">;

export interface BearerToken {
  token: string;
  expiresAt: number;
}
export type LoginCommandData = {
  user: User;
  bearer: BearerToken;
};

export type LogoutCommandResult =
  | Ok
  | Bad<"logout_failed">;

@Injectable()
export abstract class AuthenticationCommands {
  abstract login(username: string, password: string): Promise<LoginCommandResult>;
  abstract logout(userId: string): Promise<LogoutCommandResult>;
}
