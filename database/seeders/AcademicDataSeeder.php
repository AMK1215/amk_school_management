<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\AcademicYear;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Seeder;

class AcademicDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the admin user
        $admin = User::where('type', UserType::Admin->value)->first();
        
        if (!$admin) {
            $this->command->error('No admin user found. Please run UsersTableSeeder first.');
            return;
        }

        // Create Academic Year (if not exists)
        $academicYear = AcademicYear::firstOrCreate([
            'code' => 'AY2024-25',
        ], [
            'name' => '2024-2025',
            'start_date' => '2024-09-01',
            'end_date' => '2025-06-30',
            'description' => 'Academic Year 2024-2025',
            'is_active' => true,
            'created_by' => $admin->id,
        ]);

        // Create Subjects
        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH', 'credit_hours' => 4],
            ['name' => 'English Language', 'code' => 'ENG', 'credit_hours' => 3],
            ['name' => 'Science', 'code' => 'SCI', 'credit_hours' => 3],
            ['name' => 'Social Studies', 'code' => 'SOC', 'credit_hours' => 2],
            ['name' => 'Physical Education', 'code' => 'PE', 'credit_hours' => 1],
            ['name' => 'Art', 'code' => 'ART', 'credit_hours' => 1],
            ['name' => 'Music', 'code' => 'MUS', 'credit_hours' => 1],
            ['name' => 'Computer Science', 'code' => 'CS', 'credit_hours' => 2],
        ];

        foreach ($subjects as $subjectData) {
            Subject::firstOrCreate([
                'code' => $subjectData['code'],
            ], [
                'name' => $subjectData['name'],
                'description' => "Subject: {$subjectData['name']}",
                'credit_hours' => $subjectData['credit_hours'],
                'is_active' => true,
                'created_by' => $admin->id,
            ]);
        }

        // Get teachers for class assignment
        $teachers = User::where('type', UserType::Teacher->value)->get();

        // Create Classes for different grades
        $grades = [
            ['level' => 1, 'sections' => ['A', 'B']],
            ['level' => 2, 'sections' => ['A', 'B']],
            ['level' => 3, 'sections' => ['A']],
            ['level' => 4, 'sections' => ['A']],
            ['level' => 5, 'sections' => ['A']],
        ];

        $teacherIndex = 0;
        foreach ($grades as $grade) {
            foreach ($grade['sections'] as $section) {
                $className = "Grade {$grade['level']}-{$section}";
                $classCode = "G{$grade['level']}{$section}";
                
                $class = SchoolClass::firstOrCreate([
                    'code' => $classCode,
                ], [
                    'name' => $className,
                    'grade_level' => $grade['level'],
                    'section' => $section,
                    'capacity' => 30,
                    'academic_year_id' => $academicYear->id,
                    'class_teacher_id' => $teachers[$teacherIndex % $teachers->count()]->id ?? null,
                    'is_active' => true,
                    'created_by' => $admin->id,
                ]);

                // Assign all subjects to each class (if not already assigned)
                $allSubjects = Subject::all();
                if ($class->subjects()->count() === 0) {
                    $class->subjects()->attach($allSubjects->pluck('id'));
                }

                $teacherIndex++;
            }
        }

        $this->command->info('Academic data seeded successfully!');
        $this->command->info("Created: 1 Academic Year, " . count($subjects) . " Subjects, " . SchoolClass::count() . " Classes");
    }
}