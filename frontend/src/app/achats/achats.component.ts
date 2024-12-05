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
  constructor(private router:Router, private achatservice:AchatService) {
  }
  ngOnInit(): void {
    this.getAchats();
  }
  getAchats(){
    this.achatservice.getAchats()
      .subscribe({
        next: (data:any) =>{
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

  onEdit(achat: Achat) {
    this.router.navigateByUrl("/editAchat/"+achat.id);
  }

  onDelete(achat: Achat) {
    this.achatservice.deleteAchat(achat).subscribe(data=>{
      this.getAchats();
    })

  }
}
