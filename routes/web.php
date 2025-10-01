<?php

use App\Enums\UserType;
use App\Http\Controllers\Admin\AcademicYearController;
use App\Http\Controllers\Admin\SchoolClassController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teacher\ExamController;
use App\Http\Controllers\Teacher\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/contact', [\App\Http\Controllers\ContactController::class, 'index'])->name('contact');

Route::get('/', function () {
    // Get featured/recent published lessons with class and subject info
    $featuredLessons = \App\Models\Lesson::with(['class', 'subject', 'teacher'])
        ->where('status', 'published')
        ->latest()
        ->limit(6)
        ->get()
        ->groupBy('subject.name')
        ->map(function ($lessons) {
            $firstLesson = $lessons->first();
            return [
                'subject_name' => $firstLesson->subject->name,
                'subject_code' => $firstLesson->subject->code,
                'class_name' => $firstLesson->class->name,
                'lessons' => $lessons->map(fn($l) => [
                    'title' => $l->title,
                    'description' => $l->description,
                    'teacher_name' => $l->teacher->name,
                ])->take(3)->toArray(),
                'total_count' => $lessons->count(),
            ];
        })
        ->values()
        ->take(6);

    return Inertia::render('welcome', [
        'featuredLessons' => $featuredLessons,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin Routes
    Route::middleware(['user.type:' . UserType::Admin->value])->prefix('admin')->name('admin.')->group(function () {
        Route::resource('teachers', TeacherController::class);
        // Teacher-Subject assignment routes
        Route::get('teachers/{teacher}/assign-subjects', [TeacherController::class, 'assignSubjects'])->name('teachers.assign-subjects');
        Route::post('teachers/{teacher}/assign-subjects', [TeacherController::class, 'updateSubjects'])->name('teachers.update-subjects');
        // Teacher-Class assignment routes
        Route::get('teachers/{teacher}/assign-classes', [TeacherController::class, 'assignClasses'])->name('teachers.assign-classes');
        Route::post('teachers/{teacher}/assign-classes', [TeacherController::class, 'updateClasses'])->name('teachers.update-classes');
        
        Route::resource('academic-years', AcademicYearController::class);
        Route::resource('subjects', SubjectController::class);
        Route::resource('classes', SchoolClassController::class);
    });
    
    // Teacher Routes
    Route::middleware(['user.type:' . UserType::Teacher->value])->prefix('teacher')->name('teacher.')->group(function () {
        Route::resource('students', StudentController::class);
        Route::resource('exams', ExamController::class);
        Route::resource('lessons', \App\Http\Controllers\Teacher\LessonController::class);
    });
    
    // Student Routes
    Route::middleware(['user.type:' . UserType::Student->value])->prefix('student')->name('student.')->group(function () {
        Route::get('profile', function () {
            return Inertia::render('student/profile');
        })->name('profile');
        Route::get('lessons', [\App\Http\Controllers\Student\LessonController::class, 'index'])->name('lessons.index');
        Route::get('lessons/{lesson}', [\App\Http\Controllers\Student\LessonController::class, 'show'])->name('lessons.show');
    });
    
    // Parent Routes
    Route::middleware(['user.type:' . UserType::Parent->value])->prefix('parent')->name('parent.')->group(function () {
        Route::get('children', function () {
            return Inertia::render('parent/children');
        })->name('children');
    });
    
    // Guardian Routes
    Route::middleware(['user.type:' . UserType::Guardian->value])->prefix('guardian')->name('guardian.')->group(function () {
        Route::get('wards', function () {
            return Inertia::render('guardian/wards');
        })->name('wards');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
