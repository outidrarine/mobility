import { KeycloakService } from 'keycloak-angular';
import {keycloakapi} from '../assets/config.json'


export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: keycloakapi,
        realm: 'mobility-realm',
        clientId: 'mobility-client'
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}
