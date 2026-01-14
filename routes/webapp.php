<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$domain = str_replace('http://', '', config('app.url'));

Route::domain("app.$domain")->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {

        Route::get('/', function () {
            return Inertia::render('webapp/home');
        })->name('webapp.home');

        Route::get('/test', function () {
            return Inertia::render('webapp/home');
        })->name('webapp.test');

    });
});
