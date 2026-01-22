<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

test('permissions is returned by Inertia response', function () {
    /** @var TestCase $this */
    $appUrl = 'http://app.localhost/';

    $commonRole = Role::create(['title' => 'common']);
    $permission = Permission::create(['title' => 'webapp.home']);

    $commonRole->permissions()->attach([$permission->id]);

    $commonUser = User::factory()->create(['role_id' => $commonRole->id]);

    $this->actingAs($commonUser)->get($appUrl)
        ->assertInertia(fn(AssertableInertia $page) => $page->where('permissions', ['webapp.home']));
});

test("permissions is returned by Inertia response as '*' (all permissions)", function () {
    /** @var TestCase $this */
    $appUrl = 'http://app.localhost/';

    $adminRole = Role::create(['title' => 'admin']);
    $adminUser = User::factory()->create(['role_id' => $adminRole->id]);

    $this->actingAs($adminUser)->get($appUrl)
        ->assertInertia(fn(AssertableInertia $page) => $page->where('permissions', ['*']));
});

test('inertia response returns business data', function () {
    /** @var TestCase $this */
    $appUrl = 'http://app.localhost/';

    $adminRole = Role::create(['title' => 'admin']);
    $adminUser = User::factory()->create(['role_id' => $adminRole->id]);

    $this->actingAs($adminUser)->get($appUrl)
        ->assertInertia(fn(AssertableInertia $page) => $page->where('business', [
            'website' => env('APP_URL'),
            'email' => env('BUSINESS_MAIL', 'contato@wwlucas.dev'),
            'phone' => env('BUSINESS_PHONE', '5533999782780'),
            'address' => env('BUSINESS_ADDRESS', 'José Alves Cordeiro, 123 - Centro, Curitiba - PR'),
            'map' => env('BUSINESS_ADDRESS_MAP', 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1061.596165985194!2d-36.28559025659495!3d-54.28135332930326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbr!4v1769034003486!5m2!1sen!2sbr'),
        ]));
});