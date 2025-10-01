<?php

namespace Database\Seeders;

use App\Models\Admin\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['title' => 'Admin',         'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Teacher',         'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Student',      'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Parent',        'created_at' => now(), 'updated_at' => now()],
            ['title' => 'Guardian',  'created_at' => now(), 'updated_at' => now()],
        ];

        Role::insert($roles);
    }
}
