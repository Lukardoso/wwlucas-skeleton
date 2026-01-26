<?php

use App\Http\Controllers\AvatarController;
use App\Http\Middleware\EnsureHasPermission;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
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

            $data = collect([
                [
                    'id' => 1,
                    'name' => 'Jane Doe',
                    'email' => 'email@example.com',
                    'address' => 'Some fake address 78 street',
                ],
                [
                    'id' => 2,
                    'name' => 'John Doe',
                    'email' => 'email@example.com',
                    'address' => 'Some fake address 78 street',
                ],
            ]);

            $filtered = $data->filter(fn ($item) => Str::contains($item['name'], $search, true) ||
                Str::contains($item['email'], $search, true)
            )->values();

            return response()->json($filtered);
        });

        Route::get('/avatar/{user}', [AvatarController::class, 'show'])->name('avatar.show');
        Route::put('/avatar/{user}', [AvatarController::class, 'update'])->name('avatar.update');

    });
});
