import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";

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

  constructor(private fb:FormBuilder, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.achatFormGroup=this.fb.group({
      objet:this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      prix:this.fb.control(null, [Validators.required, Validators.minLength(2)])
    })
  }

  handleAddAchat() {
    this.http.post("http://localhost:8888/api/achats", this.achatFormGroup?.value).subscribe(d=>{
      console.log("save : ", d)
    })
  }
}
