import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public profile:any
  constructor(public keycloakservice:KeycloakService) {

  }

  ngOnInit(): void {
    if(this.keycloakservice.isLoggedIn()){
      this.keycloakservice.loadUserProfile().then(profile=>{
        this.profile=profile
      })
    }
  }
  onLogout(){
    this.keycloakservice.logout(window.location.origin)
  }
  async login() {
    await this.keycloakservice.login({
      redirectUri: window.location.origin
    });
  }

  protected readonly KeycloakService = KeycloakService;
}
