import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-achats',
  standalone: true,
  imports: [
    NgForOf,
    HttpClientModule
  ],
  templateUrl: './achats.component.html',
  styleUrl: './achats.component.css'
})
export class AchatsComponent implements OnInit{
  achats: any[] = [];
  constructor(private http:HttpClient) {
  }
  ngOnInit(): void {
    this.http.get("http://localhost:8888/api/achats")
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
