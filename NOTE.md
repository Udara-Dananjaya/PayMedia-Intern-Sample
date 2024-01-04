# Install Laravel installer globally
composer global require --with-all-dependencies laravel/installer:^8.x

# Create a new Laravel project
composer create-project --prefer-dist laravel/laravel:^8.x ./

# Run pending migrations
php artisan migrate

# Generate AuthController
php artisan make:controller AuthController

# Install JWT-Auth package
composer require tymon/jwt-auth

# Publish JWT-Auth configuration
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

# Generate JWT secret key
php artisan jwt:secret

# Clear route cache
php artisan route:clear

# List registered routes
php artisan route:list

# Open Laravel Tinker
php artisan tinker

# Create a sample user using Tinker
User::create(['name'=>'sample','email'=>'admin@gmail.com','password'=>Hash::make('1234')])
