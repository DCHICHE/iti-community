import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PageModel, PageResult } from "src/modules/common/Pagination";
import { PostData } from "src/modules/feed/post.model";
import { PostQueries } from "../../post.queries";

@Injectable()
export class HttpPostQueries extends PostQueries {

  constructor(private http: HttpClient) {
    super();
  }

  async getLast(roomId: string, page: PageModel): Promise<PageResult<PostData>> {
    const skip = page.page * page.perPage;
    const take = page.perPage;
    const data = await this.http.get<PostData[]>(`${environment.serverBaseUrl}/room/${roomId}/post?skip=${skip}&take=${take}`).toPromise();

    return {
      data,
      ...page
    };
  }
}
