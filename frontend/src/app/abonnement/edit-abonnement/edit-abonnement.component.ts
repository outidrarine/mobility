import {Component, NgIterable, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {formatNumber, NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Abonnement} from "../../model/abonnement.model";
import {v4 as uuidv4} from "uuid";
import {Achat} from "../../model/achat.model";
import {KeycloakService} from "keycloak-angular";
import {AbonnementService} from "../../service/abonnement.service";
import {UploadFileService} from "../../service/upload-file.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-edit-abonnement',
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
    ReactiveFormsModule,
    CalendarModule
  ],
  templateUrl: './edit-abonnement.component.html',
  styleUrl: './edit-abonnement.component.css'
})
export class EditAbonnementComponent implements OnInit{
  abonnementFormGroup!: FormGroup;
  submited: boolean | undefined;
  typesAbonnement: string[] = ['Transport en commun', 'Abo./Loc véhicule électrique, hybride rechargeable, hydrogène', 'Abo./Loc. véhicule non thermique', 'Abo./Loc vélo (tout type)','Abo.stationnement sécurisé vélo'];
  months:string[] = ['Octobre','Novembre','Décembre'];
  Villes: string[] = ['Nantes', 'Lyon', 'Amiens', 'Issy-Les-moulineaux', 'Lille','montpellier','La Boursidière'];
  modes:string[]=['Annuel', 'Mensuel','Unitaire'];
  userId!:string;
  abonnementId!:string;
  filesArray:File[]=[];
  currentAbonnement!:Abonnement
  constructor(private fb:FormBuilder, private keycloakService:KeycloakService, private abonnementService:AbonnementService, private uploadservice:UploadFileService, private router:Router, private route:ActivatedRoute) {
    this.route.params.subscribe(data=>{
      this.abonnementId=data['id'];
    })
  }
  ngOnInit(): void {
    this.abonnementId ? this.abonnementService.get(this.abonnementId).subscribe({
      next: (data:Abonnement) =>{
        this.currentAbonnement=data;
        console.log("current : ", this.currentAbonnement)
        this.initialiseForm();
        this.onDownload(this.currentAbonnement);
      },
      error : err =>{
        console.log("une erreur est survenue", err);
      }
    }):this.initialiseForm();
    this.keycloakService.loadUserProfile().then((profile) => {
      this.userId = profile.id || '';
    });
  }

  private initialiseForm() {
    this.abonnementFormGroup = this.fb.group({
      mois: this.fb.control(this.currentAbonnement?.mois, [Validators.required]),
      type: this.fb.control(this.currentAbonnement?.type, [Validators.required]),
      ville: this.fb.control(this.currentAbonnement?.ville, [Validators.required]),
      modeAbonnement: this.fb.control(this.currentAbonnement?.modeAbonnement, [Validators.required]),
      montant: this.fb.control(this.currentAbonnement?.montant, [Validators.required]),
      dateDebutValidete: this.fb.control(this.currentAbonnement?.dateDebutValidete, [Validators.required]),
      dateFinValidite: this.fb.control(this.currentAbonnement?.dateFinValidite, [Validators.required]),
      quantite: this.fb.control(this.currentAbonnement?.quantite, [Validators.required]),
      commentaire: this.fb.control(this.currentAbonnement?.commentaire),
    })
  }

  handlePost() {
    const fileUUID = uuidv4();
    const fileExtension = this.filesArray[0]?.name.split('.').pop();
    const abonnementData: Abonnement = {
      ...this.currentAbonnement,
      ...this.abonnementFormGroup.value,
      userid: this.userId,
      justifId: this.currentAbonnement?.justifId ?? `${fileUUID}.${fileExtension}`
    };

    this.submited=false;
    console.log("valide ?")
    if(this.abonnementFormGroup.valid){
      console.log("valide ");
      (this.abonnementId ? this.abonnementService.update(abonnementData) : this.abonnementService.save(abonnementData)).subscribe(data=>{
        this.submitFile(data);
      });
    }else{
      this.submited=true;
    }
  }

  onFileSelected(event: FileSelectEvent) {
    if (event.files && event.files.length > 0) {
      this.filesArray.push(event.files[0]);
      this.abonnementFormGroup.patchValue({file:this.filesArray[0]})
    }
  }

  onRemoveHandle() {
    this.filesArray=[]
  }

  private submitFile(data: Abonnement) {
    if (this.filesArray[0]) {
      const formData = new FormData();
      formData.append('file', this.filesArray[0]);
      formData.append('userId', this.userId);
      formData.append('year',  new Date().getFullYear().toString());
      formData.append('justifId', data.justifId)

      this.uploadservice.pushFileToStorage(formData).subscribe((response: any) => {
        console.log("file upload : ",response);
        this.router.navigateByUrl("/abonnements")
      });
    }
  }
  onDownload(a: Abonnement): void {

    this.uploadservice.download(a).subscribe({
      next: (response: Blob) => {
        this.filesArray.push(new File([response], a.justifId, { type: response.type }))
        this.abonnementFormGroup.patchValue({file:this.filesArray[0]})
        this.filesArray=[new File([response], a.justifId, { type: response.type })];
      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

  protected readonly formatNumber = formatNumber;
}
