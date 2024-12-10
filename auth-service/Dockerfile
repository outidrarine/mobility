# Use the official Keycloak image from Red Hat Quay or Docker Hub
FROM quay.io/keycloak/keycloak:25.0.0

# Set environment variables for Keycloak configuration
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=admin

# Expose the default Keycloak port
EXPOSE 8080

# Run Keycloak in development mode
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]
