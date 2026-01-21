<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use LogicException;
use Symfony\Component\HttpFoundation\Response;

class EnsureHasPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $routeName = $request->route()?->getName();

        throw_unless($routeName, fn () => new LogicException('Route must have a name.'));

        if (empty($user->role) || ! $this->hasPermission($user, $routeName)) {
            abort(403, 'User dont have permissions');
        }

        return $next($request);
    }

    protected function hasPermission(User $user, string $permission): bool
    {
        if (collect($user->role)->contains('title', 'admin')) {
            return true;
        }

        $permissions = $user->role?->permissions;

        return empty($permissions) ? false : $permissions->contains('title', $permission);
    }
}
