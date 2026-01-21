<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('avatar can be updated', function () {
    Storage::fake('local');

    $user = User::factory()->create();

    $response = $this->actingAs($user)->put(route('avatar.update', $user->id), [
        'avatar' => UploadedFile::fake()->image('avatar.jpg'),
    ]);

    $response->assertRedirect();

    Storage::disk('local')->assertExists($user->avatar);
});

test('avatar can be retrieved by route', function () {
    Storage::fake('local');
    $file = Storage::putFile('avatars', UploadedFile::fake()->image('avatar.jpg'));

    $user = User::factory()->create([
        'avatar' => $file,
    ]);

    $response = $this->actingAs($user)->get(route('avatar.show', $user->id));

    $filename = basename($file);

    $response
        ->assertStatus(200)
        ->assertHeader('content-type', 'image/jpeg')
        ->assertHeader('content-disposition', 'inline; filename='."{$filename}");

});
