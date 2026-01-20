<?php

use App\Http\Middleware\EnsureHasPermission;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Route;


test("user with proper role can access a permission", function () {
    /** @var TestCase $this */

    $role = Role::create(['title' => 'dashboard']);

    $permission = Permission::create(['title' => 'dashboard.show']);

    $role->permissions()->attach([$permission->id]);

    $user = User::factory()->create([
        'role_id' => $role->id
    ]);

    Route::get('/dashboard', fn() => 'dashboard')
        ->name('dashboard.show')
        ->middleware(EnsureHasPermission::class);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
});

test("user can't access not allowed permissions", function () {
    /** @var TestCase $this */

    $user = User::factory()->create();

    Route::get('/dashboard', fn() => 'dashboard panel')
        ->name('dashboard.show')
        ->middleware(EnsureHasPermission::class);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(403);
});

test("If user role is admin, it should have all avaiable permissions", function () {
    /** @var TestCase $this */

    $role = Role::create(['title' => 'admin']);

    $permissions = [
        Permission::create(['title' => 'admin.show'])->id,
        Permission::create(['title' => 'dashboard.show'])->id,
        Permission::create(['title' => 'settings.show'])->id,
    ];

    $role->permissions()->attach($permissions);

    $user = User::factory()->create([
        'role_id' => $role->id
    ]);

    Route::get('/admin', fn() => 'admin panel')
        ->name('admin.show')
        ->middleware(EnsureHasPermission::class);

    $response = $this->actingAs($user)->get('/admin');

    $response->assertOk();
});

it("throw a logic exception if route does'nt have a name", function () {

    /** @var TestCase $this */
    $this->withOutExceptionHandling();

    $user = User::factory()->create();

    Route::get('/admin', fn() => 'admin panel')
        ->middleware(EnsureHasPermission::class);

    $this->actingAs($user)->get('/admin');
})->throws(LogicException::class, "Route must have a name.");

