<?php

namespace App\Http\Controllers;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        switch ($user->type) {
            case UserType::Admin->value:
                return $this->adminDashboard();
            
            case UserType::Teacher->value:
                return $this->teacherDashboard();
            
            case UserType::Student->value:
                return $this->studentDashboard();
            
            case UserType::Parent->value:
                return $this->parentDashboard();
            
            case UserType::Guardian->value:
                return $this->guardianDashboard();
            
            default:
                return Inertia::render('dashboard');
        }
    }

    private function adminDashboard()
    {
        $stats = [
            'total_teachers' => User::where('type', UserType::Teacher->value)->count(),
            'total_students' => User::where('type', UserType::Student->value)->count(),
            'total_parents' => User::where('type', UserType::Parent->value)->count(),
            'total_guardians' => User::where('type', UserType::Guardian->value)->count(),
        ];

        $recent_teachers = User::where('type', UserType::Teacher->value)
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_teachers' => $recent_teachers,
        ]);
    }

    private function teacherDashboard()
    {
        $teacher = auth()->user();
        
        $stats = [
            'total_students' => $teacher->students()->count(),
            'active_students' => $teacher->students()->where('status', true)->count(),
        ];

        $recent_students = $teacher->students()
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('teacher/dashboard', [
            'stats' => $stats,
            'recent_students' => $recent_students,
        ]);
    }

    private function studentDashboard()
    {
        $student = auth()->user();
        $teacher = $student->teacher;

        return Inertia::render('student/dashboard', [
            'teacher' => $teacher,
            'profile' => $student,
        ]);
    }

    private function parentDashboard()
    {
        // Parents can view their children's information
        // This would require additional relationship setup
        return Inertia::render('parent/dashboard', [
            'message' => 'Welcome to Parent Dashboard',
        ]);
    }

    private function guardianDashboard()
    {
        // Guardians can view their ward's information
        // This would require additional relationship setup
        return Inertia::render('guardian/dashboard', [
            'message' => 'Welcome to Guardian Dashboard',
        ]);
    }
}
