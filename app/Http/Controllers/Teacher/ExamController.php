<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\Exam;
use App\Models\SchoolClass;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index()
    {
        $exams = Exam::with(['subject', 'class', 'academicYear'])
            ->where('created_by', auth()->id())
            ->orderBy('exam_date', 'desc')
            ->paginate(10);

        return Inertia::render('teacher/exams/index', [
            'exams' => $exams,
        ]);
    }

    public function create()
    {
        $currentYear = AcademicYear::current();
        $subjects = Subject::active()->get();
        $classes = SchoolClass::active()
            ->where('academic_year_id', $currentYear?->id)
            ->get();

        return Inertia::render('teacher/exams/create', [
            'subjects' => $subjects,
            'classes' => $classes,
            'currentAcademicYear' => $currentYear,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:exams',
            'description' => 'nullable|string',
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'required|exists:classes,id',
            'exam_date' => 'required|date|after:today',
            'duration_minutes' => 'required|integer|min:15|max:300',
            'total_marks' => 'required|numeric|min:1|max:1000',
            'passing_marks' => 'required|numeric|min:1|max:1000|lt:total_marks',
            'type' => 'required|in:quiz,assignment,midterm,final,project',
        ]);

        $currentYear = AcademicYear::current();
        
        if (!$currentYear) {
            return redirect()->back()
                ->with('error', 'No active academic year found. Please contact administrator.');
        }

        Exam::create([
            'title' => $request->title,
            'code' => strtoupper($request->code),
            'description' => $request->description,
            'subject_id' => $request->subject_id,
            'class_id' => $request->class_id,
            'academic_year_id' => $currentYear->id,
            'exam_date' => $request->exam_date,
            'duration_minutes' => $request->duration_minutes,
            'total_marks' => $request->total_marks,
            'passing_marks' => $request->passing_marks,
            'type' => $request->type,
            'is_published' => false,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('teacher.exams.index')
            ->with('success', 'Exam created successfully.');
    }

    public function show(Exam $exam)
    {
        // Ensure the exam belongs to the authenticated teacher
        if ($exam->created_by !== auth()->id()) {
            abort(403, 'Unauthorized access to this exam.');
        }

        $exam->load(['subject', 'class', 'academicYear', 'creator']);

        return Inertia::render('teacher/exams/show', [
            'exam' => $exam,
        ]);
    }

    public function edit(Exam $exam)
    {
        // Ensure the exam belongs to the authenticated teacher
        if ($exam->created_by !== auth()->id()) {
            abort(403, 'Unauthorized access to this exam.');
        }

        $subjects = Subject::active()->get();
        $classes = SchoolClass::active()
            ->where('academic_year_id', $exam->academic_year_id)
            ->get();

        return Inertia::render('teacher/exams/edit', [
            'exam' => $exam,
            'subjects' => $subjects,
            'classes' => $classes,
        ]);
    }

    public function update(Request $request, Exam $exam)
    {
        // Ensure the exam belongs to the authenticated teacher
        if ($exam->created_by !== auth()->id()) {
            abort(403, 'Unauthorized access to this exam.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:exams,code,' . $exam->id,
            'description' => 'nullable|string',
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'required|exists:classes,id',
            'exam_date' => 'required|date',
            'duration_minutes' => 'required|integer|min:15|max:300',
            'total_marks' => 'required|numeric|min:1|max:1000',
            'passing_marks' => 'required|numeric|min:1|max:1000|lt:total_marks',
            'type' => 'required|in:quiz,assignment,midterm,final,project',
            'is_published' => 'boolean',
        ]);

        $exam->update([
            'title' => $request->title,
            'code' => strtoupper($request->code),
            'description' => $request->description,
            'subject_id' => $request->subject_id,
            'class_id' => $request->class_id,
            'exam_date' => $request->exam_date,
            'duration_minutes' => $request->duration_minutes,
            'total_marks' => $request->total_marks,
            'passing_marks' => $request->passing_marks,
            'type' => $request->type,
            'is_published' => $request->is_published ?? false,
        ]);

        return redirect()->route('teacher.exams.index')
            ->with('success', 'Exam updated successfully.');
    }

    public function destroy(Exam $exam)
    {
        // Ensure the exam belongs to the authenticated teacher
        if ($exam->created_by !== auth()->id()) {
            abort(403, 'Unauthorized access to this exam.');
        }

        $exam->delete();

        return redirect()->route('teacher.exams.index')
            ->with('success', 'Exam deleted successfully.');
    }
}