# Mentor PHP Env

## Requirements

- Node.js >=14.x
- Docker >=20.x

## Usage

```bash
cd ${LARAVEL_DIR}
npx @dyoshikawa/mentor-php-env
docker compose up -d
```

Migrate DB and launch the server.

```bash
docker compose app bash
php artisan migrate
php artisan serve --host 0.0.0.0
```

Open [http://localhost:8000](http://localhost:8000)

## References

- [https://github.com/ucan-lab/docker-laravel](https://github.com/ucan-lab/docker-laravel)

I used that as a reference.
