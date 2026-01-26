<?php

use App\Http\Controllers\AvatarController;
use App\Http\Middleware\EnsureHasPermission;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$domain = str_replace('http://', '', config('app.url'));

Route::domain("app.$domain")->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {

        Route::middleware(EnsureHasPermission::class)->group(function () {
            Route::get('/', function () {
                return Inertia::render('webapp/home')->with(['message' => 'This is a session message from server...']);
            })->name('webapp.home');

            Route::get('/admin', function () {
                return Inertia::render('webapp/admin');
            })->name('webapp.test');
        });

        Route::get('/fake-api/{search}', function (string $search) {
            sleep(1);

            return str_contains($search, 'j')
                ? response()->json([
                    [
                        'id' => 1,
                        'name' => 'John Doe',
                        'email' => 'dDkYH@example.com',
                        'address' => 'Some fake address 78 street',
                    ],
                    [
                        'id' => 2,
                        'name' => 'Jane Doe',
                        'email' => 'dDkYH@example.com',
                        'address' => 'Some fake address 78 street',
                    ],
                ])
                : response()->json([]);
        });

        Route::get('/avatar/{user}', [AvatarController::class, 'show'])->name('avatar.show');
        Route::put('/avatar/{user}', [AvatarController::class, 'update'])->name('avatar.update');

    });
});
