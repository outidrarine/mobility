import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private https: HttpClient) {
  }

  pushFileToStorage(fileFormData: FormData): Observable<HttpEvent<{}>> {
    const newRequest = new HttpRequest('POST', 'http://localhost:8082/savefile', fileFormData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }

}
