FROM php:8.1

COPY --from=composer:2.1 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
    apt-get -y install git libicu-dev libonig-dev libzip-dev unzip locales && \
    apt-get clean
RUN docker-php-ext-install intl pdo_mysql zip bcmath
RUN composer config -g process-timeout 3600 && \
    composer config -g repos.packagist composer https://packagist.org

WORKDIR /work
