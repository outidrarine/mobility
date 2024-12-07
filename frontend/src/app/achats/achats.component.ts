import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {AchatService} from "../service/achat.service";
import {Achat} from "../model/achat.model";
import {saveAs} from 'file-saver'
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-achats',
  standalone: true,
  imports: [
    NgForOf,
    ButtonModule,
    TableModule
  ],
  templateUrl: './achats.component.html',
  styleUrl: './achats.component.css'
})
export class AchatsComponent implements OnInit{
  achats: Achat[] = [];
  constructor(private router:Router, private achatservice:AchatService, private http:HttpClient) {
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

  onDownload(a: Achat) {
    const url = `http://localhost:8082/getfile/${a.userid}/2024/${a.justifId}`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        saveAs(response, a.justifId); // Automatically downloads the file

      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

}
