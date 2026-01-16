<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function show(Request $request)
    {
        return Storage::response($request->user()->avatar);
    }

    public function update(Request $request)
    {
        if (! $request->user()) {
            return to_route('login');
        }

        $request->validate([
            'avatar' => ['required', 'image'],
        ]);

        $request->user()->update([
            'avatar' => $request->file('avatar')->store('avatars'),
        ]);

        return back()->with('success', 'Avatar updated.');
    }
}
