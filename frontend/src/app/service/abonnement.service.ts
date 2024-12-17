import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiUrl} from "../../../assets/config.json"
import {Abonnement} from "../model/abonnement.model";

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  apiUrl: string =apiUrl;
  constructor(private http:HttpClient) { }

  public getAbonnements() : Observable<Abonnement[]>{
    return this.http.get<Abonnement[]>(this.apiUrl+"abonnements");
  }
  public save(achatData:Abonnement) : Observable<Abonnement>{
    return this.http.post<Abonnement>(this.apiUrl+"abonnements", achatData);
  }

  public get(id:String):Observable<Abonnement>{
    return this.http.get<Abonnement>(this.apiUrl+"abonnements/"+id);
  }

  public update(achat:Abonnement):Observable<Abonnement>{
    return this.http.put<Abonnement>(this.apiUrl+"abonnements/"+achat.id, achat)
  }
  public delete(achat:Abonnement):Observable<Abonnement>{
    return this.http.delete<Abonnement>(this.apiUrl+"abonnements/"+achat.id)
  }

}
