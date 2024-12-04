import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-achat',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-achat.component.html',
  styleUrl: './form-achat.component.css'
})
export class FormAchatComponent implements OnInit{
  achatFormGroup! : FormGroup;

  constructor(private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.achatFormGroup=this.fb.group({
      objet:this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      prix:this.fb.control(null, [Validators.required, Validators.minLength(2)])
    })
  }

  handleAddAchat() {
    console.log(this.achatFormGroup.value)
  }
}
