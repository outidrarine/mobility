import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "../keycloak-init";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),     {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    deps: [KeycloakService],
    multi: true
  },
    importProvidersFrom(KeycloakAngularModule),]
};
