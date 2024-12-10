import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        Button,
        CardModule,
        PrimeTemplate,
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
