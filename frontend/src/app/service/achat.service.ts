import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Achat} from "../model/achat.model";

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  constructor(private http:HttpClient) { }

  public getAchats() : Observable<Achat[]>{
    return this.http.get<Achat[]>("http://localhost:8888/api/achats");
  }
}
