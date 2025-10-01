<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = User::where('type', UserType::Teacher->value)
            ->with(['students'])
            ->withCount('students')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/teachers/index', [
            'teachers' => $teachers,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/teachers/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'phone' => 'required|string|max:20|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $teacher = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'user_name' => $this->generateUsername('TCH'),
            'type' => UserType::Teacher->value,
            'teacher_id' => null, // Teachers don't have a teacher_id
            'referral_code' => 'TCH' . Str::random(6),
            'status' => true,
        ]);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Teacher created successfully.');
    }

    public function show(User $teacher)
    {
        $teacher->load([
            'students' => function ($query) {
                $query->withCount('students');
            },
            'subjects'
        ]);

        return Inertia::render('admin/teachers/show', [
            'teacher' => $teacher,
        ]);
    }

    public function edit(User $teacher)
    {
        return Inertia::render('admin/teachers/edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(Request $request, User $teacher)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $teacher->id,
            'phone' => 'required|string|max:20|unique:users,phone,' . $teacher->id,
            'status' => 'boolean',
        ]);

        $teacher->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'status' => $request->status ?? true,
        ]);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Teacher updated successfully.');
    }

    public function destroy(User $teacher)
    {
        if ($teacher->students()->count() > 0) {
            return redirect()->route('admin.teachers.index')
                ->with('error', 'Cannot delete teacher with active students.');
        }

        $teacher->delete();

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Teacher deleted successfully.');
    }

    private function generateUsername($prefix)
    {
        $count = User::where('user_name', 'like', $prefix . '%')->count();
        return $prefix . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
    }

    public function assignSubjects(User $teacher)
    {
        $subjects = \App\Models\Subject::active()->get();
        $academicYears = \App\Models\AcademicYear::active()->get();
        
        // Load subjects with pivot data (academic_year_id)
        $teacher->load('subjects');
        
        return Inertia::render('admin/teachers/assign-subjects', [
            'teacher' => $teacher,
            'subjects' => $subjects,
            'academicYears' => $academicYears,
        ]);
    }

    public function updateSubjects(Request $request, User $teacher)
    {
        $request->validate([
            'academic_year_id' => 'required|exists:academic_years,id',
            'subjects' => 'required|array',
            'subjects.*' => 'exists:subjects,id',
        ]);

        // First, detach subjects for this academic year
        $teacher->subjects()->wherePivot('academic_year_id', $request->academic_year_id)->detach();

        // Then attach new subjects with academic year
        $syncData = [];
        foreach ($request->subjects as $subjectId) {
            $syncData[$subjectId] = ['academic_year_id' => $request->academic_year_id];
        }
        
        $teacher->subjects()->attach($syncData);

        return redirect()->route('admin.teachers.show', $teacher)
            ->with('success', 'Subjects assigned successfully.');
    }

    public function assignClasses(User $teacher)
    {
        $classes = \App\Models\SchoolClass::with(['subjects'])
            ->where('is_active', true)
            ->get();
        
        // Get teacher's assigned subjects
        $teacher->load('subjects');
        
        // Get current class-subject assignments for this teacher
        $assignments = \DB::table('class_subject')
            ->where('teacher_id', $teacher->id)
            ->get()
            ->map(function($item) {
                return [
                    'class_id' => $item->class_id,
                    'subject_id' => $item->subject_id,
                ];
            });

        return Inertia::render('admin/teachers/assign-classes', [
            'teacher' => $teacher,
            'classes' => $classes,
            'currentAssignments' => $assignments,
        ]);
    }

    public function updateClasses(Request $request, User $teacher)
    {
        $request->validate([
            'assignments' => 'required|array',
            'assignments.*.class_id' => 'required|exists:classes,id',
            'assignments.*.subject_id' => 'required|exists:subjects,id',
        ]);

        // Remove all existing class-subject assignments for this teacher
        \DB::table('class_subject')
            ->where('teacher_id', $teacher->id)
            ->update(['teacher_id' => null]);

        // Add new assignments
        foreach ($request->assignments as $assignment) {
            // Check if record exists
            $exists = \DB::table('class_subject')
                ->where('class_id', $assignment['class_id'])
                ->where('subject_id', $assignment['subject_id'])
                ->exists();

            if ($exists) {
                // Update existing record
                \DB::table('class_subject')
                    ->where('class_id', $assignment['class_id'])
                    ->where('subject_id', $assignment['subject_id'])
                    ->update(['teacher_id' => $teacher->id]);
            } else {
                // Create new record if it doesn't exist
                \DB::table('class_subject')->insert([
                    'class_id' => $assignment['class_id'],
                    'subject_id' => $assignment['subject_id'],
                    'teacher_id' => $teacher->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return redirect()->route('admin.teachers.show', $teacher)
            ->with('success', 'Classes assigned successfully.');
    }
}
