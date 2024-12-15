import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {Router} from "@angular/router";
import {Abonnement} from "../../model/abonnement.model";

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
  Abonnements: Abonnement[]=[];
  constructor(private router:Router) {
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

  onDownload(abonnement: Abonnement) {

  }

  onEdit(abonnement: Abonnement) {

  }

  onDelete(abonnement: Abonnement) {

  }
}
