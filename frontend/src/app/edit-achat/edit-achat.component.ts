import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AchatService} from "../service/achat.service";
import {KeycloakService} from "keycloak-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Achat} from "../model/achat.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-achat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './edit-achat.component.html',
  styleUrl: './edit-achat.component.css'
})
export class EditAchatComponent implements OnInit{
  achatFormGroup!: FormGroup;
  achatId!:String;
  currentAchat!:Achat;
  constructor(private fb:FormBuilder, private achatservice:AchatService, private route:ActivatedRoute, private router:Router) {
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
            prix:this.fb.control(this.currentAchat.prix, [Validators.required, Validators.minLength(2)])
          });
        },
        error : err =>{
          console.log("une erreur est survenue", err);
        }
    })
  }
}
