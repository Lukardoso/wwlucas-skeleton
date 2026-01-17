<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function show(User $user)
    {
        abort_if($user->id !== Auth::id(), 403);

        return Storage::response(
            $user->avatar,
        );
    }

    public function update(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image'],
        ]);

        $request->user()->update([
            'avatar' => $request->file('avatar')->store('avatars'),
        ]);

        return back()->with('success', 'Avatar updated.');
    }
}
