<?php

use App\Http\Middleware\EnsureHasPermission;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

beforeEach(function () {
    Route::middleware(EnsureHasPermission::class)->group(function () {
        Route::get('/admin', fn () => 'admin panel')->name('admin.index');
        Route::get('/dashboard', fn () => 'dashboard')->name('dashboard.index');
        Route::get('/settings', fn () => 'settings')->name('settings.index');
    });
});

test('user with proper role can access a permission', function () {
    /** @var TestCase $this */
    $role = Role::create(['title' => 'dashboard']);

    $permission = Permission::create(['title' => 'dashboard.index']);

    $role->permissions()->attach([$permission->id]);

    $user = User::factory()->create([
        'role_id' => $role->id,
    ]);

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
});

test('the user cannot access permissions that have not been granted', function () {
    /** @var TestCase $this */
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(403);
});

test('If user role is admin, it should have all avaiable permissions', function () {
    /** @var TestCase $this */
    $role = Role::create(['title' => 'admin']);

    $permissionsId = [
        Permission::create(['title' => 'admin.index'])->id,
        Permission::create(['title' => 'dashboard.index'])->id,
        Permission::create(['title' => 'settings.index'])->id,
    ];

    $role->permissions()->attach($permissionsId);

    $user = User::factory()->create([
        'role_id' => $role->id,
    ]);

    $this->actingAs($user)->get('/admin')->assertOk();
    $this->actingAs($user)->get('/dashboard')->assertOk();
    $this->actingAs($user)->get('/settings')->assertOk();
});

it("throw a logic exception if route does'nt have a name", function () {
    /** @var TestCase $this */
    $this->withOutExceptionHandling();

    $user = User::factory()->create();

    Route::get('/no-name', fn () => 'no name')->middleware(EnsureHasPermission::class);

    $this->actingAs($user)->get('/no-name');
})->throws(LogicException::class, 'Route must have a name.');
