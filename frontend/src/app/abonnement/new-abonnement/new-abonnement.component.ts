import {Component, NgIterable, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-abonnement',
  standalone: true,
    imports: [
        CardModule,
        FileUploadModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        NgForOf,
        NgIf,
        PrimeTemplate,
        ReactiveFormsModule
    ],
  templateUrl: './new-abonnement.component.html',
  styleUrl: './new-abonnement.component.css'
})
export class NewAbonnementComponent implements OnInit{
  abonnementFormGroup!: FormGroup;
  submited: boolean | undefined;
  typesAbonnement: string[] = ['Transport en commun', 'Abo./Loc véhicule électrique, hybride rechargeable, hydrogène', 'Abo./Loc. véhicule non thermique', 'Abo./Loc vélo (tout type)','Abo.stationnement sécurisé vélo'];
  months:string[] = ['Octobre','Novembre','Décembre'];
  uploadedFile: any;
  constructor(private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.abonnementFormGroup = this.fb.group({

    })
  }

  handleAddAbonnement() {

  }

  onFileSelected($event: FileSelectEvent) {

  }

  onRemoveHandle() {

  }

}
