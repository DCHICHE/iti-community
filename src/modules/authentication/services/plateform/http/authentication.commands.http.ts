import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Ok } from "src/modules/common/Result";
import { AuthenticationCommands, LoginCommandResult, LogoutCommandResult } from "../../authentication.commands";

@Injectable()
export class HttpAuthenticationCommands extends AuthenticationCommands {
  constructor(private http: HttpClient) {
    super();
  }

  login(username: string, password: string): Promise<LoginCommandResult> {
    return this.http.post<LoginCommandResult>(`${environment.serverBaseUrl}/auth/login`, { username, password }).toPromise();
  }

  async logout(userId: string): Promise<LogoutCommandResult> {
    return Ok();
  }
}
