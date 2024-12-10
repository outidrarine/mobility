#!/bin/bash
envsubst < /usr/share/nginx/html/assets/config-prod.json > /usr/share/nginx/html/assets/config.json && exec nginx -g 'daemon off;'
