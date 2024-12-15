import { Routes } from '@angular/router';
import {AchatsComponent} from "./achat/achats/achats.component";
import {AuthGuard} from "./guards/auth.guard";
import {NewAchatComponent} from "./achat/new-achat/new-achat.component";
import {EditAchatComponent} from "./achat/edit-achat/edit-achat.component";
import {HomeComponent} from "./home/home.component";
import {AppComponent} from "./app.component";
import {RhComponent} from "./rh/rh.component";
import {NewAbonnementComponent} from "./abonnement/new-abonnement/new-abonnement.component";
import {AbonnementsComponent} from "./abonnement/abonnements/abonnements.component";

export const routes: Routes = [

  {path: "", component: HomeComponent},
  {path: "achats", component:AchatsComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "abonnements", component:AbonnementsComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "newAbonnement", component:NewAbonnementComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "newAchat", component: NewAchatComponent},
  {path: "editAchat/:id", component: EditAchatComponent},
  {path:"rh",component:RhComponent, canActivate: [AuthGuard], data:{roles:['RH']}}
];
