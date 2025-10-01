<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register', [
            'availableUserTypes' => [
                ['value' => UserType::Parent->value, 'label' => 'Parent'],
                ['value' => UserType::Guardian->value, 'label' => 'Guardian'],
            ]
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:20|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'type' => 'required|integer|in:' . UserType::Parent->value . ',' . UserType::Guardian->value,
        ]);

        $userType = UserType::from($request->type);
        $prefix = $userType === UserType::Parent ? 'PAR' : 'GUA';

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'user_name' => $this->generateUsername($prefix),
            'type' => $request->type,
            'referral_code' => $prefix . Str::random(6),
            'status' => true, // Auto-activate for self-registration
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Generate a unique username with prefix.
     */
    private function generateUsername(string $prefix): string
    {
        $count = User::where('user_name', 'like', $prefix . '%')->count();
        return $prefix . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
    }
}
