import { Routes } from '@angular/router';
import {AchatsComponent} from "./achats/achats.component";
import {AuthGuard} from "./guards/auth.guard";
import {FormAchatComponent} from "./form-achat/form-achat.component";

export const routes: Routes = [
  {path: "achats", component:AchatsComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "newAchat", component: FormAchatComponent}
];
