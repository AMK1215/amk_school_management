<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Create school admin
        $admin = $this->createUser(
            UserType::Admin,
            'School Administrator',
            'admin001',
            '09123456789',
            null,
            'ADM'.Str::random(6)
        );

        // Create teachers
        $teachers = [];
        for ($i = 1; $i <= 5; $i++) {
            $teacher = $this->createUser(
                UserType::Teacher,
                "Teacher $i",
                'TCH'.str_pad($i, 3, '0', STR_PAD_LEFT),
                '091123456'.str_pad($i, 2, '0', STR_PAD_LEFT),
                null, // Teachers don't have a teacher_id
                'TCH'.Str::random(6)
            );
            $teachers[] = $teacher;
        }

        // Create students for each teacher
        foreach ($teachers as $teacherIndex => $teacher) {
            for ($i = 1; $i <= 8; $i++) {
                $this->createUser(
                    UserType::Student,
                    "Student " . ($teacherIndex + 1) . "-$i",
                    'STU'.str_pad($teacherIndex + 1, 2, '0', STR_PAD_LEFT).str_pad($i, 2, '0', STR_PAD_LEFT),
                    '091111111'.str_pad($teacherIndex + 1, 1, '0', STR_PAD_LEFT).str_pad($i, 2, '0', STR_PAD_LEFT),
                    $teacher->id,
                    'STU'.Str::random(6)
                );
            }
        }

        // Create parents for some students
        $students = User::where('type', UserType::Student->value)->get();
        foreach ($students->take(10) as $index => $student) {
            $this->createUser(
                UserType::Parent,
                "Parent of " . $student->name,
                'PAR'.str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                '092222222'.str_pad($index + 1, 2, '0', STR_PAD_LEFT),
                null, // Parents don't have a teacher_id
                'PAR'.Str::random(6)
            );
        }

        // Create guardians for some students
        foreach ($students->skip(10)->take(5) as $index => $student) {
            $this->createUser(
                UserType::Guardian,
                "Guardian of " . $student->name,
                'GUA'.str_pad($index + 1, 3, '0', STR_PAD_LEFT),
                '093333333'.str_pad($index + 1, 2, '0', STR_PAD_LEFT),
                null, // Guardians don't have a teacher_id
                'GUA'.Str::random(6)
            );
        }
    }

    private function createUser(
        UserType $type,
        string $name,
        string $user_name,
        string $phone,
        ?int $teacher_id = null,
        ?string $referral_code = null
    ): User {
        return User::create([
            'name' => $name,
            'email' => $user_name . '@school.com',
            'user_name' => $user_name,
            'phone' => $phone,
            'password' => Hash::make('password123'),
            'teacher_id' => $teacher_id,
            'status' => 1,
            'is_changed_password' => 1,
            'type' => $type->value,
            'referral_code' => $referral_code,
        ]);
    }

}
