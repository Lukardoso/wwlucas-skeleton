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