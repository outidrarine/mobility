import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Achat} from "../model/achat.model";
import {apiUrl} from "../../../assets/config.json"

@Injectable({
  providedIn: 'root'
})
export class AchatService {
  apiUrl: string =apiUrl;
  constructor(private http:HttpClient) { }

  public getAchats() : Observable<Achat[]>{
    return this.http.get<Achat[]>(this.apiUrl+"achats");
  }
  public saveAchat(achatData:Achat) : Observable<Achat>{
    return this.http.post<Achat>(this.apiUrl+"achats", achatData);
  }

  public getAchat(id:String):Observable<Achat>{
    return this.http.get<Achat>(this.apiUrl+"achats/"+id);
  }

  public updateAchat(achat:Achat):Observable<Achat>{
    return this.http.put<Achat>(this.apiUrl+"achats/"+achat.id, achat)
  }
  public deleteAchat(achat:Achat):Observable<Achat>{
    return this.http.delete<Achat>(this.apiUrl+"achats/"+achat.id)
  }


}
