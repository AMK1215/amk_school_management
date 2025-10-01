<?php

namespace App\Http\Controllers\Teacher;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $students = User::where('type', UserType::Student->value)
            ->where('teacher_id', auth()->id())
            ->with('schoolClass')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('teacher/students/index', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        // Get classes where this teacher is assigned to teach
        $teacherClasses = \DB::table('class_subject')
            ->join('classes', 'class_subject.class_id', '=', 'classes.id')
            ->where('class_subject.teacher_id', auth()->id())
            ->where('classes.is_active', true)
            ->select('classes.id', 'classes.name', 'classes.code', 'classes.grade_level', 'classes.section')
            ->distinct()
            ->get();

        return Inertia::render('teacher/students/create', [
            'classes' => $teacherClasses,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users',
            'phone' => 'required|string|max:20|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'class_id' => 'required|exists:classes,id',
        ]);

        // Verify teacher is assigned to this class
        $isAssignedToClass = \DB::table('class_subject')
            ->where('class_id', $request->class_id)
            ->where('teacher_id', auth()->id())
            ->exists();

        if (!$isAssignedToClass) {
            return back()->withErrors(['class_id' => 'You are not assigned to teach in this class.']);
        }

        $student = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'user_name' => $this->generateUsername('STU'),
            'type' => UserType::Student->value,
            'teacher_id' => auth()->id(),
            'class_id' => $request->class_id,
            'referral_code' => 'STU' . Str::random(6),
            'status' => true,
        ]);

        return redirect()->route('teacher.students.index')
            ->with('success', 'Student created successfully.');
    }

    public function show(User $student)
    {
        // Ensure the student belongs to the authenticated teacher
        if ($student->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this student.');
        }

        return Inertia::render('teacher/students/show', [
            'student' => $student,
        ]);
    }

    public function edit(User $student)
    {
        // Ensure the student belongs to the authenticated teacher
        if ($student->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this student.');
        }

        // Get classes where this teacher is assigned to teach
        $teacherClasses = \DB::table('class_subject')
            ->join('classes', 'class_subject.class_id', '=', 'classes.id')
            ->where('class_subject.teacher_id', auth()->id())
            ->where('classes.is_active', true)
            ->select('classes.id', 'classes.name', 'classes.code', 'classes.grade_level', 'classes.section')
            ->distinct()
            ->get();

        return Inertia::render('teacher/students/edit', [
            'student' => $student,
            'classes' => $teacherClasses,
        ]);
    }

    public function update(Request $request, User $student)
    {
        // Ensure the student belongs to the authenticated teacher
        if ($student->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this student.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $student->id,
            'phone' => 'required|string|max:20|unique:users,phone,' . $student->id,
            'class_id' => 'required|exists:classes,id',
            'status' => 'boolean',
        ]);

        // Verify teacher is assigned to this class
        $isAssignedToClass = \DB::table('class_subject')
            ->where('class_id', $request->class_id)
            ->where('teacher_id', auth()->id())
            ->exists();

        if (!$isAssignedToClass) {
            return back()->withErrors(['class_id' => 'You are not assigned to teach in this class.']);
        }

        $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'class_id' => $request->class_id,
            'status' => $request->status ?? true,
        ]);

        return redirect()->route('teacher.students.index')
            ->with('success', 'Student updated successfully.');
    }

    public function destroy(User $student)
    {
        // Ensure the student belongs to the authenticated teacher
        if ($student->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this student.');
        }

        $student->delete();

        return redirect()->route('teacher.students.index')
            ->with('success', 'Student deleted successfully.');
    }

    private function generateUsername($prefix)
    {
        $count = User::where('user_name', 'like', $prefix . '%')->count();
        return $prefix . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
    }
}
