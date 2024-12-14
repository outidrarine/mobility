import { Routes } from '@angular/router';
import {AchatsComponent} from "./achat/achats/achats.component";
import {AuthGuard} from "./guards/auth.guard";
import {FormAchatComponent} from "./achat/new-achat/form-achat.component";
import {EditAchatComponent} from "./achat/edit-achat/edit-achat.component";
import {HomeComponent} from "./home/home.component";
import {AppComponent} from "./app.component";
import {RhComponent} from "./rh/rh.component";

export const routes: Routes = [

  {path: "", component: HomeComponent},
  {path: "achats", component:AchatsComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "newAchat", component: FormAchatComponent},
  {path: "editAchat/:id", component: EditAchatComponent},
  {path:"rh",component:RhComponent, canActivate: [AuthGuard], data:{roles:['RH']}}
];
