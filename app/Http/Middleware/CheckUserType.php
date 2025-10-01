<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$types): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        $userType = $request->user()->type;
        $allowedTypes = collect($types)->map(fn($type) => (int) $type);

        if (!$allowedTypes->contains($userType)) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
