import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {MenubarModule} from "primeng/menubar";
import {NgClass, NgIf} from "@angular/common";
import {BadgeModule} from "primeng/badge";
import {AvatarModule} from "primeng/avatar";
import {MenuItem} from "primeng/api";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Button, ButtonDirective} from "primeng/button";
import {Menu, MenuModule} from "primeng/menu";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenubarModule, NgClass, BadgeModule, AvatarModule, NgIf, ButtonDirective, MenuModule, CardModule, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'KFMD | Forfait Mobilité Durable';
  public profile:any;
  items: MenuItem[] | undefined;
  constructor(public keycloakservice:KeycloakService) {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink:'/'
      },
      {
        label: 'Achats',
        icon: 'pi pi-shopping-cart',
        routerLink:'/achats'
      },
      {
        label: 'Saisie Kilométrique',
        icon: 'pi pi-compass'
      },
      {
        label: 'Saisie Abonnement',
        icon: 'pi pi-directions'
      },
      {
        label: 'RH',
        icon: 'pi pi-user-plus',
        routerLink:'/rh',
        visible: keycloakservice.isUserInRole('RH')
      },
      {

        label:this.keycloakservice.isLoggedIn()? this.keycloakservice?.getUsername():'',

        icon:'pi pi-user',
        items:[{
          label:"Login",
          command:()=>this.login()
        },{
          label:"Logout",
          command:()=>this.onLogout()
        }]

      }
    ];
  }

  ngOnInit(): void {
    if(this.keycloakservice.isLoggedIn()){
      this.keycloakservice.loadUserProfile().then(profile=>{
        this.profile=profile;

      })
    }

  }
  onLogout(){
    this.keycloakservice.logout(window.location.origin);
  }
  async login() {
    await this.keycloakservice.login({
      redirectUri: window.location.origin
    });
  }

  protected readonly KeycloakService = KeycloakService;
}
