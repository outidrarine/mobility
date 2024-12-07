import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeycloakService} from "keycloak-angular";
import {AchatService} from "../service/achat.service";
import {Router} from "@angular/router";
import {UploadFileService} from "../service/upload-file.service";
import {Achat} from "../model/achat.model";
import { v4 as uuidv4 } from 'uuid';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {ListboxModule} from "primeng/listbox";
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {Button} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {FileSelectEvent, FileUploadEvent, FileUploadModule} from "primeng/fileupload";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";

@Component({
  selector: 'app-form-achat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    InputTextModule,
    MultiSelectModule,
    PaginatorModule,
    ListboxModule,
    CardModule,
    BadgeModule,
    Button,
    ToastModule,
    FileUploadModule,
    NgClass,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './form-achat.component.html',
  styleUrl: './form-achat.component.css'
})
export class FormAchatComponent implements OnInit{
  achatFormGroup! : FormGroup;
  userId!: string;
  userEmail!: string;
  months:string[]=['Janvier','Février','Mars'];
  typesAchats:string[]=['vélo', 'clavier','souris']
  uploadedFiles: File|null=null;
  submited:boolean=false;

  constructor(private uploadservice: UploadFileService, private fb:FormBuilder, private achatservice:AchatService, private keycloakService:KeycloakService, private router:Router) {
  }

  ngOnInit(): void {
    this.achatFormGroup=this.fb.group({
      objet:this.fb.control(null, [Validators.required]),
      prix:this.fb.control(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
      file: this.fb.control('', [Validators.required]),
      mois:this.fb.control('',[Validators.required]),
      typeAchat:this.fb.control('',[Validators.required])
    });
    this.keycloakService.loadUserProfile().then((profile) => {
      this.userId = profile.id || '';
      this.userEmail = profile.email || '';
    });
  }

  handleAddAchat() {
    if(this.achatFormGroup.valid){
      this.submited=false;
      this.postAchat();
    }else{
      this.submited=true;
    }
  }
  postAchat(){
    const fileExtension = this.uploadedFiles?.name.split('.').pop();
    const newUUID = uuidv4();
    const achatData = {
      ...this.achatFormGroup.value,
      userid: this.userId,
      usermail: this.userEmail,
      justifId:`${newUUID}.${fileExtension}`
    };

    this.achatservice.saveAchat(achatData).subscribe(d => {
      console.log("post achat : ", d)
      this.submitFile(d);
    });
  }

  onFileSelected(event: FileSelectEvent) {
    if (event.files && event.files.length > 0) {
      this.uploadedFiles = event.files[0];
    }
  }

  submitFile(saisie:Achat) {
    if (this.uploadedFiles) {
      const formData = new FormData();
      formData.append('file', this.uploadedFiles);
      formData.append('userId', this.userId);
      const annee= new Date().getFullYear();
      formData.append('year',  annee.toString());
      formData.append('justifId', saisie.justifId)

      this.uploadservice.pushFileToStorage(formData).subscribe((response: any) => {
        console.log("file upload : ",response);
        this.router.navigateByUrl("/achats")
      });
    }
  }

  onRemoveHandle() {
    this.uploadedFiles=null;
  }
}
