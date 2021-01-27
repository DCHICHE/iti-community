import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "src/modules/user/user.model";
import { UserCommands } from "../../user.commands";

@Injectable()
export class HttpUserCommands extends UserCommands {
  constructor(private http: HttpClient) {
    super();
  }

  register(username: string, password: string): Promise<{ id: string; }> {
    return this.http.post<{ id: string; }>(`${environment.serverBaseUrl}/user`, { username, password }).toPromise();
  }

  async update(user: { id: string; username?: string | undefined; photo?: File | undefined; }): Promise<User> {
    const formData: FormData = new FormData();
    if (user.username) {
      formData.append("username", user.username as string);
    }

    if (user.photo) {
      formData.append("photo", user.photo as File);
    }

    return this.http.put<User>(`${environment.serverBaseUrl}/user`, formData).toPromise();
  }
}
