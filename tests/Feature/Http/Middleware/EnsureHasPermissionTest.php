<?php

use App\Http\Middleware\EnsureHasPermission;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Route;

test("user with proper role can access a permission", function () {
    $role = Role::create(['title' => 'admin']);

    $permission = Permission::create(['title' => 'admin.show']);

    $role->permissions()->attach([$permission->id]);

    $user = User::factory()->create([
        'role_id' => $role->id
    ]);

    Route::get('/admin', fn() => 'admin panel')
        ->name('admin.show')
        ->middleware(EnsureHasPermission::class);

    $response = $this->actingAs($user)->get('/admin');

    $response->assertOk();
});

test("user can't access not allowed permissions", function () {
    $user = User::factory()->create();

    Route::get('/admin', fn() => 'admin panel')
        ->name('admin.show')
        ->middleware(EnsureHasPermission::class);

    $response = $this->actingAs($user)->get('/admin');

    $response->assertStatus(403);
});

it("throw a logic exception if route does'nt have a name", function () {
    $this->withOutExceptionHandling();

    $user = User::factory()->create();

    Route::get('/admin', fn() => 'admin panel')
        ->middleware(EnsureHasPermission::class);

    $this->actingAs($user)->get('/admin');
})->throws(LogicException::class, "Route must have a name.");
