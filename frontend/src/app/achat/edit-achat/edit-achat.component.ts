import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AchatService} from "../../service/achat.service";
import {KeycloakService} from "keycloak-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Achat} from "../../model/achat.model";
import {NgForOf, NgIf} from "@angular/common";
import {CardModule} from "primeng/card";
import {FileSelectEvent, FileUpload, FileUploadModule} from "primeng/fileupload";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {UploadFileService} from "../../service/upload-file.service";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-edit-achat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    CardModule,
    FileUploadModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    NgForOf,
    PrimeTemplate
  ],
  templateUrl: './edit-achat.component.html',
  styleUrl: './edit-achat.component.css'
})
export class EditAchatComponent implements OnInit{
  achatFormGroup!: FormGroup;
  achatId:String|null=null;
  currentAchat!:Achat;
  userId!: string;
  months:string[]=['Octobre','Novembre','Décembre'];
  typesAchats:string[]=['Vélo (tout type)', 'Équipement de sécurité', 'Entretien et réparation de vélo']
  submited:boolean=false;
  filesArray:File[]=[];
  constructor(private fb:FormBuilder, private achatservice:AchatService, private route:ActivatedRoute, private router:Router, private uploadservice:UploadFileService, private keycloakService:KeycloakService) {
    this.route.params.subscribe(data=>{
      this.achatId=data['id'];
    })
  }

  handlePost() {
    const fileUUID = uuidv4();
    const fileExtension = this.filesArray[0]?.name.split('.').pop();
    const achatData: Achat = {
      ...this.currentAchat,
      ...this.achatFormGroup.value,
      userid: this.userId,
      justifId: this.currentAchat?.justifId ?? `${fileUUID}.${fileExtension}`
    };

    this.submited=false;
    if(this.achatFormGroup.valid){
      (this.achatId ? this.achatservice.updateAchat(achatData) : this.achatservice.saveAchat(achatData)).subscribe(data=>{
        this.submitFile(data);
      });
    }else{
      this.submited=true;
    }
  }
  submitFile(saisie:Achat) {
    if (this.filesArray[0]) {
      const formData = new FormData();
      formData.append('file', this.filesArray[0]);
      formData.append('userId', this.userId);
      formData.append('year',  new Date().getFullYear().toString());
      formData.append('justifId', saisie.justifId)

      this.uploadservice.pushFileToStorage(formData).subscribe((response: any) => {
        console.log("file upload : ",response);
        this.router.navigateByUrl("/achats")
      });
    }
  }

  ngOnInit(): void {
    this.achatId ? this.achatservice.getAchat(this.achatId).subscribe({
        next: (data:Achat) =>{
          this.currentAchat=data;
          this.initialiseForm();
          this.onDownload(this.currentAchat);

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
    return this.achatFormGroup = this.fb.group({
      objet: this.fb.control(this.currentAchat?.objet, [Validators.required, Validators.minLength(4)]),
      prix: this.fb.control(this.currentAchat?.prix, [Validators.required, Validators.minLength(2)]),
      file: this.fb.control(this.filesArray[0], [Validators.required]),
      mois: this.fb.control(this.currentAchat?.mois, [Validators.required]),
      type: this.fb.control(this.currentAchat?.type, [Validators.required]),
      commentaire: this.fb.control(this.currentAchat?.commentaire, [Validators.maxLength(120)]),

    });
  }

  onRemoveHandle() {
    this.filesArray=[]
  }

  onFileSelected(event: FileSelectEvent) {
    if (event.files && event.files.length > 0) {
      this.filesArray.push(event.files[0]);
      this.achatFormGroup.patchValue({file:this.filesArray[0]})
    }
  }
  onDownload(a: Achat): void {

    this.uploadservice.download(a).subscribe({
      next: (response: Blob) => {
        this.filesArray.push(new File([response], a.justifId, { type: response.type }))
        this.achatFormGroup.patchValue({file:this.filesArray[0]})
        this.filesArray=[new File([response], a.justifId, { type: response.type })];
      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

}
