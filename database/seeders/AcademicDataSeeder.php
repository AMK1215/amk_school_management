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

        // Create Academic Years for 10 years (2025-2026 to 2034-2035)
        $academicYears = [];
        $currentYear = 2025;
        
        for ($i = 0; $i < 10; $i++) {
            $startYear = $currentYear + $i;
            $endYear = $startYear + 1;
            
            $academicYear = AcademicYear::firstOrCreate([
                'code' => "AY{$startYear}-" . substr($endYear, 2),
            ], [
                'name' => "{$startYear}-{$endYear}",
                'start_date' => "{$startYear}-06-01",
                'end_date' => "{$endYear}-03-31",
                'description' => "Academic Year {$startYear}-{$endYear}",
                'is_active' => $i === 0, // Only first year is active
                'created_by' => $admin->id,
            ]);
            
            $academicYears[] = $academicYear;
        }

        // Create Subjects
        $subjects = [
            ['name' => 'Myanmar', 'code' => 'MYA', 'credit_hours' => 3],
            ['name' => 'English', 'code' => 'ENG', 'credit_hours' => 3],
            ['name' => 'Mathematics', 'code' => 'MATH', 'credit_hours' => 4],
            ['name' => 'Geography', 'code' => 'GEO', 'credit_hours' => 2],
            ['name' => 'History', 'code' => 'HIST', 'credit_hours' => 2],
            ['name' => 'Physics', 'code' => 'PHY', 'credit_hours' => 3],
            ['name' => 'Chemistry', 'code' => 'CHEM', 'credit_hours' => 3],
            ['name' => 'Social Studies', 'code' => 'SOC', 'credit_hours' => 2],
            ['name' => 'Art', 'code' => 'ART', 'credit_hours' => 1],
            ['name' => 'Science', 'code' => 'SCI', 'credit_hours' => 3],
            ['name' => 'Computer Science', 'code' => 'CS', 'credit_hours' => 2],
            ['name' => 'Music', 'code' => 'MUS', 'credit_hours' => 1],
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

        // Create Classes from KG to Grade 12
        $grades = [
            // Kindergarten
            ['level' => 0, 'name' => 'KG', 'sections' => ['A', 'B']],
            // Grade 1-6 (Primary)
            ['level' => 1, 'name' => 'Grade 1', 'sections' => ['A', 'B']],
            ['level' => 2, 'name' => 'Grade 2', 'sections' => ['A', 'B']],
            ['level' => 3, 'name' => 'Grade 3', 'sections' => ['A']],
            ['level' => 4, 'name' => 'Grade 4', 'sections' => ['A']],
            ['level' => 5, 'name' => 'Grade 5', 'sections' => ['A']],
            ['level' => 6, 'name' => 'Grade 6', 'sections' => ['A']],
            // Grade 7-9 (Middle School)
            ['level' => 7, 'name' => 'Grade 7', 'sections' => ['A']],
            ['level' => 8, 'name' => 'Grade 8', 'sections' => ['A']],
            ['level' => 9, 'name' => 'Grade 9', 'sections' => ['A']],
            // Grade 10-12 (High School)
            ['level' => 10, 'name' => 'Grade 10', 'sections' => ['A']],
            ['level' => 11, 'name' => 'Grade 11', 'sections' => ['A']],
            ['level' => 12, 'name' => 'Grade 12', 'sections' => ['A']],
        ];

        $teacherIndex = 0;
        $activeAcademicYear = $academicYears[0]; // Use first academic year (2025-2026)
        
        foreach ($grades as $grade) {
            foreach ($grade['sections'] as $section) {
                $className = $grade['level'] === 0 ? "KG-{$section}" : "{$grade['name']}-{$section}";
                $classCode = $grade['level'] === 0 ? "KG{$section}" : "G{$grade['level']}{$section}";
                
                $class = SchoolClass::firstOrCreate([
                    'code' => $classCode,
                ], [
                    'name' => $className,
                    'grade_level' => $grade['level'],
                    'section' => $section,
                    'capacity' => $grade['level'] === 0 ? 20 : 30, // KG has smaller capacity
                    'academic_year_id' => $activeAcademicYear->id,
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

        $classCount = SchoolClass::count();
        $this->command->info('Academic data seeded successfully!');
        $this->command->info("Created: 10 Academic Years, " . count($subjects) . " Subjects, {$classCount} Classes (KG to Grade 12)");
    }
}