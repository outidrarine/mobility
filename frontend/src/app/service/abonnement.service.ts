import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Achat} from "../model/achat.model";
import {apiUrl} from "../../../assets/config.json"

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  apiUrl: string =apiUrl;
  constructor(private http:HttpClient) { }

  public getAchats() : Observable<Achat[]>{
    return this.http.get<Achat[]>(this.apiUrl+"abonnement");
  }
  public saveAchat(achatData:Achat) : Observable<Achat>{
    return this.http.post<Achat>(this.apiUrl+"abonnement", achatData);
  }

  public getAchat(id:String):Observable<Achat>{
    return this.http.get<Achat>(this.apiUrl+"abonnement/"+id);
  }

  public updateAchat(achat:Achat):Observable<Achat>{
    return this.http.put<Achat>(this.apiUrl+"abonnement/"+achat.id, achat)
  }
  public deleteAchat(achat:Achat):Observable<Achat>{
    return this.http.delete<Achat>(this.apiUrl+"abonnement/"+achat.id)
  }

}
