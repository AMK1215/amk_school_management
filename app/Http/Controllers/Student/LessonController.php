<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index(Request $request)
    {
        $student = $request->user();
        
        // Get lessons for the student's class (published only)
        $lessons = Lesson::with(['class', 'subject', 'teacher'])
            ->where('class_id', $student->class_id)
            ->where('status', 'published')
            ->orderBy('lesson_date', 'desc')
            ->paginate(15);

        return Inertia::render('student/lessons/index', [
            'lessons' => $lessons,
        ]);
    }

    public function show(Lesson $lesson)
    {
        $student = auth()->user();
        
        // Ensure lesson is published and for student's class
        if ($lesson->status !== 'published' || $lesson->class_id !== $student->class_id) {
            abort(403, 'Unauthorized access to this lesson.');
        }

        $lesson->load(['class', 'subject', 'teacher']);

        return Inertia::render('student/lessons/show', [
            'lesson' => $lesson,
        ]);
    }
}
