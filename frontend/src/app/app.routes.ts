import { Routes } from '@angular/router';
import {AchatsComponent} from "./achats/achats.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {path: "achats", component:AchatsComponent, canActivate: [AuthGuard], data : {roles : ['USER']}}
];
