import {Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-achats',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './achats.component.html',
  styleUrl: './achats.component.css'
})
export class AchatsComponent implements OnInit{
  private apiUrl = environment.apiBaseUrl;
  achats: any[] = [];
  constructor(private http:HttpClient) {
  }
  ngOnInit(): void {
    this.http.get(`${this.apiUrl}`)
      .subscribe({
        next: (data:any) =>{
          console.log("test", data);
          this.achats = data._embedded?.achats || []
        },
        error : err =>{
          console.log(err);
        }
      })
  }

}
