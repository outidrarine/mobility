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
  public saveAchat(achatData:Achat) : Observable<Achat>{
    return this.http.post<Achat>("http://localhost:8888/api/achats", achatData);
  }

  public getAchat(id:String):Observable<Achat>{
    return this.http.get<Achat>("http://localhost:8888/api/achats/"+id);
  }

  public updateAchat(achat:Achat):Observable<Achat>{
    return this.http.put<Achat>("http://localhost:8888/api/achats/"+achat.id, achat)
  }
  public deleteAchat(achat:Achat):Observable<Achat>{
    return this.http.delete<Achat>("http://localhost:8888/api/achats/"+achat.id)
  }
}
