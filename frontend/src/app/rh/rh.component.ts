import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {TagModule} from "primeng/tag";
import {NgClass} from "@angular/common";
import {AchatService} from "../service/achat.service";

@Component({
  selector: 'app-rh',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    FormsModule,
    PaginatorModule,
    TagModule,
    NgClass
  ],
  templateUrl: './rh.component.html',
  styleUrl: './rh.component.css'
})
export class RhComponent implements OnInit{
  saisies: any;
  loading: unknown;
  representatives: any[] | undefined;
  statuses: any[] | undefined;
  constructor(private achatservice:AchatService) {
  }

  ngOnInit(): void {
        this.achatservice.getAchats().subscribe((data:any)=>{
          this.saisies = data._embedded?.achats || []
        })
    }

  getSeverity(label: string | BufferSource | undefined  | null | HTMLLabelElement) {
    return undefined;
  }
}
