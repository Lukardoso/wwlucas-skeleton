<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/webapp.php';

Route::get('/', function () {
    return 'Website';
})->name('home');

require __DIR__.'/settings.php';
