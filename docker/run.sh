#!/bin/bash

echo "Running tests"
cd /var/www && npm run test

echo "Building UI"
cd /var/www/ui && npm run build

echo "Running projects"
cd /var/www && npm run start