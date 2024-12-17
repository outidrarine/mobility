import { Routes } from '@angular/router';
import {AchatsComponent} from "./achat/achats/achats.component";
import {AuthGuard} from "./guards/auth.guard";
import {EditAchatComponent} from "./achat/edit-achat/edit-achat.component";
import {HomeComponent} from "./home/home.component";
import {RhComponent} from "./rh/rh.component";
import {AbonnementsComponent} from "./abonnement/abonnements/abonnements.component";
import {EditAbonnementComponent} from "./abonnement/edit-abonnement/edit-abonnement.component";

export const routes: Routes = [

  {path: "", component: HomeComponent},
  {path: "achats", component:AchatsComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "abonnements", component:AbonnementsComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "newAbonnement", component:EditAbonnementComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "newAbonnement/:id", component:EditAbonnementComponent, canActivate: [AuthGuard], data : {roles : ['USER']}},
  {path: "newAchat", component: EditAchatComponent},
  {path: "editAchat/:id", component: EditAchatComponent},
  {path:"rh",component:RhComponent, canActivate: [AuthGuard], data:{roles:['RH']}}
];
