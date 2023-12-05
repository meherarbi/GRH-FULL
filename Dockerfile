# Utilisez une image PHP 8 avec Apache
FROM php:8.0-apache

# Installez les extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_mysql

# Copiez votre code source dans le conteneur
COPY . /var/www/html

# Exposez le port 80
EXPOSE 80
