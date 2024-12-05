import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeycloakService} from "keycloak-angular";
import {AchatService} from "../service/achat.service";
import {Router} from "@angular/router";
import {routes} from "../app.routes";

@Component({
  selector: 'app-form-achat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './form-achat.component.html',
  styleUrl: './form-achat.component.css'
})
export class FormAchatComponent implements OnInit{
  achatFormGroup! : FormGroup;
  userId!: string;
  userEmail!: string;

  constructor(private fb:FormBuilder, private achatservice:AchatService, private keycloakService:KeycloakService, private router:Router) {
  }

  ngOnInit(): void {
    this.achatFormGroup=this.fb.group({
      objet:this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      prix:this.fb.control(null, [Validators.required, Validators.minLength(2)])
    });
    this.keycloakService.loadUserProfile().then((profile) => {
      this.userId = profile.id || '';
      this.userEmail = profile.email || '';
    });
  }

  handleAddAchat() {
    const achatData = {
      ...this.achatFormGroup.value,
      userid: this.userId,
      usermail: this.userEmail
    };

    this.achatservice.saveAchat(achatData).subscribe(d => {
      this.router
      this.router.navigateByUrl("/achats")
    });
  }
}
