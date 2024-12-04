import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {AchatService} from "../service/achat.service";
import {Observable} from "rxjs";
import {Achat} from "../model/achat.model";

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
  achats: Achat[] = [];
  constructor(private http:HttpClient, private router:Router, private achatservice:AchatService) {
  }
  ngOnInit(): void {
    this.http.get<Achat>("http://localhost:8888/api/achats")
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

  handleNouveauAchat() {
    this.router.navigateByUrl("/newAchat");
  }
}
