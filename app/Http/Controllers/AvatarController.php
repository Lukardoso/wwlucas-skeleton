<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AvatarController extends Controller
{
    public function show(User $user): StreamedResponse
    {
        abort_if($user->id !== Auth::id(), 403);

        abort_if(! $user->avatar, 404, "Avatar not found.");

        return Storage::response(
            $user->avatar,
        );
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'image'],
        ]);

        $request->user()?->update([
            'avatar' => $request->file('avatar')->store('avatars'),
        ]);

        return back()->with('success', 'Avatar updated.');
    }
}
