import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Achat} from "../model/achat.model";
import {apiUrl} from "../../../assets/config.json"

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  apiUrl:string=apiUrl;
  constructor(private http: HttpClient) {
  }

  pushFileToStorage(fileFormData: FormData): Observable<HttpEvent<{}>> {
    const newRequest = new HttpRequest('POST', this.apiUrl+'savefile', fileFormData, { //http://localhost:8082/savefile
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  download(a:any):Observable<any>{
    return this.http.get(this.apiUrl+`getfile/${a.userid}/2024/${a.justifId}`, { responseType: 'blob' }); //http://localhost:8082/getfile/${a.userid}/2024/${a.justifId}
  }



}
