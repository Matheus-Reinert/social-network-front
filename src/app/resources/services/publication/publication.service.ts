import { Post } from './../../models/Post';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Publication } from "../../models/publication";



@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }

   getPublicationToUser() {
      return this.http.get<Post>(`${environment.api}/posts/user`)
  }
}
