<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->createUsers();
    }

    /**
     * Seed default users for default routes
     * development only pourpose
     */
    protected function createUsers(): void
    {
        $admin = Role::create(['title' => 'admin']);
        $commom = Role::create(['title' => 'commom']);
        $permission = Permission::create(['title' => 'webapp.home']);

        $commom->permissions()->attach([$permission->id]);

        User::firstOrCreate(
            ['email' => 'admin@email.com'],
            [
                'name' => 'Admin',
                'password' => 'password',
                'email_verified_at' => now(),
                'role_id' => $admin->id,
            ]
        );

        User::firstOrCreate(
            ['email' => 'common@email.com'],
            [
                'name' => 'Common User',
                'password' => 'password',
                'email_verified_at' => now(),
                'role_id' => $commom->id,
            ]
        );
    }
}
