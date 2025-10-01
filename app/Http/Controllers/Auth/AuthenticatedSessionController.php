<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Role-based redirect after successful login
        $user = Auth::user();
        $redirectRoute = $this->getRoleBasedRedirect($user->type);

        return redirect()->intended($redirectRoute);
    }

    /**
     * Get the appropriate redirect route based on user type.
     */
    private function getRoleBasedRedirect(int $userType): string
    {
        return match ($userType) {
            UserType::Admin->value => route('dashboard'),
            UserType::Teacher->value => route('dashboard'),
            UserType::Student->value => route('dashboard'),
            UserType::Parent->value => route('dashboard'),
            UserType::Guardian->value => route('dashboard'),
            default => route('dashboard'),
        };
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
