<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@school.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        // Create teacher user
        User::create([
            'name' => 'Teacher User',
            'email' => 'teacher@school.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        // Create student user
        User::create([
            'name' => 'Student User',
            'email' => 'student@school.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
    }
}