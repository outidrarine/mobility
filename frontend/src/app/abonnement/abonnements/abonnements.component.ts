import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {Router} from "@angular/router";
import {Abonnement} from "../../model/abonnement.model";
import {AbonnementService} from "../../service/abonnement.service";
import {Achat} from "../../model/achat.model";
import {saveAs} from "file-saver";
import {UploadFileService} from "../../service/upload-file.service";

@Component({
  selector: 'app-abonnements',
  standalone: true,
  imports: [
    ButtonDirective,
    CardModule,
    PrimeTemplate,
    TableModule,
    TagModule
  ],
  templateUrl: './abonnements.component.html',
  styleUrl: './abonnements.component.css'
})
export class AbonnementsComponent {
  abonnements: Abonnement[]=[];
  constructor(private router:Router, private abonnementService:AbonnementService, private uploadservice:UploadFileService) {
  }
  ngOnInit(): void {
    this.getAchats();
  }
  getAchats(){
    this.abonnementService.getAbonnements()
      .subscribe({
        next: (data:any) =>{
          this.abonnements = data._embedded?.abonnements || []
        },
        error : err =>{
          console.log(err);
        }
      })
  }

  handleNouveauAbonnement() {
    this.router.navigateByUrl('/newAbonnement')
  }
  severity(abonnement:Abonnement) {
    switch (abonnement.valide) {
      case null || undefined:
        return 'info';
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }

  onDownload(a: Abonnement) {

    this.uploadservice.download(a).subscribe({
      next: (response: Blob) => {
        saveAs(response, a.justifId); // Automatically downloads the file

      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

  onEdit(a: Abonnement) {
    this.router.navigateByUrl("/newAbonnement/"+a.id);
  }

  onDelete(a: Abonnement) {
    this.abonnementService.delete(a).subscribe(data=>{
      this.getAchats();
    })

  }
}
