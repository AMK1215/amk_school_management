<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolClassController extends Controller
{
    public function index()
    {
        $classes = SchoolClass::with(['academicYear', 'classTeacher', 'creator'])
            ->withCount('students')
            ->orderBy('grade_level')
            ->orderBy('section')
            ->paginate(10);

        return Inertia::render('admin/classes/index', [
            'classes' => $classes,
        ]);
    }

    public function create()
    {
        $academicYears = AcademicYear::active()->get();
        $teachers = User::where('type', UserType::Teacher->value)
            ->where('status', true)
            ->get();
        $subjects = Subject::active()->get();

        return Inertia::render('admin/classes/create', [
            'academicYears' => $academicYears,
            'teachers' => $teachers,
            'subjects' => $subjects,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:classes',
            'grade_level' => 'required|integer|min:1|max:12',
            'section' => 'nullable|string|max:10',
            'capacity' => 'required|integer|min:1|max:100',
            'academic_year_id' => 'required|exists:academic_years,id',
            'class_teacher_id' => 'nullable|exists:users,id',
            'subjects' => 'array',
            'subjects.*' => 'exists:subjects,id',
            'is_active' => 'boolean',
        ]);

        $class = SchoolClass::create([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'grade_level' => $request->grade_level,
            'section' => $request->section,
            'capacity' => $request->capacity,
            'academic_year_id' => $request->academic_year_id,
            'class_teacher_id' => $request->class_teacher_id,
            'is_active' => $request->is_active ?? true,
            'created_by' => auth()->id(),
        ]);

        // Attach subjects to the class
        if ($request->subjects) {
            $class->subjects()->attach($request->subjects);
        }

        return redirect()->route('admin.classes.index')
            ->with('success', 'Class created successfully.');
    }

    public function show(SchoolClass $schoolClass)
    {
        $schoolClass->load([
            'academicYear', 
            'classTeacher', 
            'creator', 
            'students',
            'subjects',
            'exams.creator'
        ]);

        return Inertia::render('admin/classes/show', [
            'class' => $schoolClass,
        ]);
    }

    public function edit(SchoolClass $schoolClass)
    {
        $academicYears = AcademicYear::active()->get();
        $teachers = User::where('type', UserType::Teacher->value)
            ->where('status', true)
            ->get();
        $subjects = Subject::active()->get();

        $schoolClass->load('subjects');

        return Inertia::render('admin/classes/edit', [
            'class' => $schoolClass,
            'academicYears' => $academicYears,
            'teachers' => $teachers,
            'subjects' => $subjects,
        ]);
    }

    public function update(Request $request, SchoolClass $schoolClass)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:classes,code,' . $schoolClass->id,
            'grade_level' => 'required|integer|min:1|max:12',
            'section' => 'nullable|string|max:10',
            'capacity' => 'required|integer|min:1|max:100',
            'academic_year_id' => 'required|exists:academic_years,id',
            'class_teacher_id' => 'nullable|exists:users,id',
            'subjects' => 'array',
            'subjects.*' => 'exists:subjects,id',
            'is_active' => 'boolean',
        ]);

        $schoolClass->update([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'grade_level' => $request->grade_level,
            'section' => $request->section,
            'capacity' => $request->capacity,
            'academic_year_id' => $request->academic_year_id,
            'class_teacher_id' => $request->class_teacher_id,
            'is_active' => $request->is_active ?? true,
        ]);

        // Sync subjects
        if ($request->subjects) {
            $schoolClass->subjects()->sync($request->subjects);
        }

        return redirect()->route('admin.classes.index')
            ->with('success', 'Class updated successfully.');
    }

    public function destroy(SchoolClass $schoolClass)
    {
        if ($schoolClass->students()->count() > 0) {
            return redirect()->route('admin.classes.index')
                ->with('error', 'Cannot delete class with enrolled students.');
        }

        $schoolClass->delete();

        return redirect()->route('admin.classes.index')
            ->with('success', 'Class deleted successfully.');
    }
}