import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-form-achat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './form-achat.component.html',
  styleUrl: './form-achat.component.css'
})
export class FormAchatComponent implements OnInit{
  achatFormGroup! : FormGroup;
  userId!: string;
  userEmail!: string;

  constructor(private fb:FormBuilder, private http:HttpClient, private keycloakService:KeycloakService) {
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

    this.http.post("http://localhost:8888/api/achats", achatData).subscribe(d => {
      console.log("save : ", d);
    });
  }
}
