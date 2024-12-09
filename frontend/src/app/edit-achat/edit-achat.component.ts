import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AchatService} from "../service/achat.service";
import {KeycloakService} from "keycloak-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Achat} from "../model/achat.model";
import {NgForOf, NgIf} from "@angular/common";
import {CardModule} from "primeng/card";
import {FileSelectEvent, FileUpload, FileUploadModule} from "primeng/fileupload";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {HttpClient} from "@angular/common/http";

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
  achatId!:String;
  currentAchat!:Achat;

  months:string[]=['Janvier','Février','Mars'];
  typesAchats:string[]=['vélo', 'clavier','souris']
  uploadedFile: File | null = null;
  filesArray:File[]=[];
  constructor(private fb:FormBuilder, private achatservice:AchatService, private route:ActivatedRoute, private router:Router, private http:HttpClient) {
    this.route.params.subscribe(data=>{
      this.achatId=data['id'];
    })
  }

  handleEditAchat() {
    const achatData: Achat = {
      ...this.currentAchat,
      ...this.achatFormGroup.value
    };
    this.achatservice.updateAchat(achatData).subscribe(data=>{
      this.router.navigateByUrl("/achats")
    });
  }

  ngOnInit(): void {
    this.achatservice.getAchat(this.achatId).subscribe({
        next: (data:Achat) =>{
          this.currentAchat=data;
          this.achatFormGroup=this.fb.group({
            objet:this.fb.control(this.currentAchat.objet, [Validators.required, Validators.minLength(4)]),
            prix:this.fb.control(this.currentAchat.prix, [Validators.required, Validators.minLength(2)]),
            file: this.fb.control(this.uploadedFile, [Validators.required]),
            mois:this.fb.control(this.currentAchat.mois,[Validators.required]),
            type:this.fb.control(this.currentAchat.type,[Validators.required]),
            commentaire:this.fb.control(this.currentAchat.commentaire,[Validators.maxLength(120)]),

          });
          this.onDownload(this.currentAchat);

        },
        error : err =>{
          console.log("une erreur est survenue", err);
        }
    })

  }

  onRemoveHandle() {
    this.uploadedFile=null
    this.filesArray=[]
  }

  onFileSelected(event: FileSelectEvent) {
    if (event.files && event.files.length > 0) {
      this.uploadedFile = event.files[0];
      this.achatFormGroup.patchValue({file:this.uploadedFile})
    }
  }
  onDownload(a: Achat): void {
    const url = `http://localhost:8082/getfile/${a.userid}/2024/${a.justifId}`;

    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        // Convert the Blob to a File
        this.uploadedFile = new File([response], a.justifId, { type: response.type });
        this.achatFormGroup.patchValue({file:this.uploadedFile})
        this.filesArray=[new File([response], a.justifId, { type: response.type })];
      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

}
