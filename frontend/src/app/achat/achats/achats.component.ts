import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {AchatService} from "../../service/achat.service";
import {Achat} from "../../model/achat.model";
import {saveAs} from 'file-saver'
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {TagModule} from "primeng/tag";
import {UploadFileService} from "../../service/upload-file.service";

@Component({
  selector: 'app-achats',
  standalone: true,
  imports: [
    NgForOf,
    ButtonModule,
    TableModule,
    CardModule,
    TagModule
  ],
  templateUrl: './achats.component.html',
  styleUrl: './achats.component.css'
})
export class AchatsComponent implements OnInit{
  achats: Achat[] = [];
  constructor(private router:Router, private achatservice:AchatService, private http:HttpClient, private uploadservice:UploadFileService) {
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

    this.uploadservice.download(a).subscribe({
      next: (response: Blob) => {
        saveAs(response, a.justifId); // Automatically downloads the file

      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

  severity(achat:Achat) {
    switch (achat.valide) {
      case null||undefined:
        return 'info';
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }
}
