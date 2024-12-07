import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeycloakService} from "keycloak-angular";
import {AchatService} from "../service/achat.service";
import {Router} from "@angular/router";
import {UploadFileService} from "../service/upload-file.service";
import {Achat} from "../model/achat.model";
import { v4 as uuidv4 } from 'uuid';
import { NgForOf, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {ListboxModule} from "primeng/listbox";

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
    ListboxModule
  ],
  templateUrl: './form-achat.component.html',
  styleUrl: './form-achat.component.css'
})
export class FormAchatComponent implements OnInit{
  achatFormGroup! : FormGroup;
  userId!: string;
  userEmail!: string;
  selectedFile: File | null = null;
  months:string[]=['Janvier','Février','Mars'];
  typesAchats:string[]=['vélo', 'clavier','souris']

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
    this.postAchat();
  }
  postAchat(){
    const fileExtension = this.selectedFile?.name.split('.').pop();
    const newUUID = uuidv4();
    const achatData = {
      ...this.achatFormGroup.value,
      userid: this.userId,
      usermail: this.userEmail,
      justifId:`${newUUID}.${fileExtension}`
    };

    this.achatservice.saveAchat(achatData).subscribe(d => {
      this.onSubmit(d);
    });
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  onSubmit(saisie:Achat) {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.userId);
      const annee= new Date().getFullYear();
      formData.append('year',  annee.toString());
      formData.append('justifId', saisie.justifId)

      this.uploadservice.pushFileToStorage(formData).subscribe((response: any) => {
        this.router.navigateByUrl("/achats")
      });
    }
  }
}
