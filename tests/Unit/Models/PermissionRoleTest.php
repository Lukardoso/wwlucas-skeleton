<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

it('can create Role with permissions', function () {
    $permission = Permission::create(['title' => 'Permission A']);
    $role = Role::create(['title' => 'Admin']);
    $user = User::factory()->create([
        'role_id' => $role->id,
    ]);

    $role->permissions()->attach([$permission]);

    $expected = $user->role->permissions->pluck('title')->toArray();

    expect($expected)->toBe(['Permission A']);
});
