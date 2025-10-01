<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function index()
    {
        $lessons = Lesson::with(['class', 'subject'])
            ->where('teacher_id', auth()->id())
            ->orderBy('lesson_date', 'desc')
            ->paginate(10);

        return Inertia::render('teacher/lessons/index', [
            'lessons' => $lessons,
        ]);
    }

    public function create()
    {
        // Get classes and subjects that this teacher is assigned to teach
        $assignedClassSubjects = $this->getTeacherAssignedClassSubjects();

        return Inertia::render('teacher/lessons/create', [
            'classSubjects' => $assignedClassSubjects,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'class_id' => 'required|exists:classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'lesson_date' => 'nullable|date',
            'duration_minutes' => 'nullable|integer|min:1|max:480',
            'status' => 'required|in:draft,published',
        ]);

        // Verify teacher is assigned to teach this subject in this class
        $isAssigned = DB::table('class_subject')
            ->where('class_id', $request->class_id)
            ->where('subject_id', $request->subject_id)
            ->where('teacher_id', auth()->id())
            ->exists();

        if (!$isAssigned) {
            return back()->withErrors(['error' => 'You are not assigned to teach this subject in this class.']);
        }

        Lesson::create([
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->content,
            'class_id' => $request->class_id,
            'subject_id' => $request->subject_id,
            'teacher_id' => auth()->id(),
            'lesson_date' => $request->lesson_date,
            'duration_minutes' => $request->duration_minutes,
            'status' => $request->status,
        ]);

        return redirect()->route('teacher.lessons.index')
            ->with('success', 'Lesson created successfully.');
    }

    public function show(Lesson $lesson)
    {
        // Ensure the lesson belongs to the authenticated teacher
        if ($lesson->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this lesson.');
        }

        $lesson->load(['class', 'subject']);

        return Inertia::render('teacher/lessons/show', [
            'lesson' => $lesson,
        ]);
    }

    public function edit(Lesson $lesson)
    {
        // Ensure the lesson belongs to the authenticated teacher
        if ($lesson->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this lesson.');
        }

        $assignedClassSubjects = $this->getTeacherAssignedClassSubjects();

        return Inertia::render('teacher/lessons/edit', [
            'lesson' => $lesson,
            'classSubjects' => $assignedClassSubjects,
        ]);
    }

    public function update(Request $request, Lesson $lesson)
    {
        // Ensure the lesson belongs to the authenticated teacher
        if ($lesson->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this lesson.');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'class_id' => 'required|exists:classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'lesson_date' => 'nullable|date',
            'duration_minutes' => 'nullable|integer|min:1|max:480',
            'status' => 'required|in:draft,published',
        ]);

        // Verify teacher is assigned to teach this subject in this class
        $isAssigned = DB::table('class_subject')
            ->where('class_id', $request->class_id)
            ->where('subject_id', $request->subject_id)
            ->where('teacher_id', auth()->id())
            ->exists();

        if (!$isAssigned) {
            return back()->withErrors(['error' => 'You are not assigned to teach this subject in this class.']);
        }

        $lesson->update([
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->content,
            'class_id' => $request->class_id,
            'subject_id' => $request->subject_id,
            'lesson_date' => $request->lesson_date,
            'duration_minutes' => $request->duration_minutes,
            'status' => $request->status,
        ]);

        return redirect()->route('teacher.lessons.index')
            ->with('success', 'Lesson updated successfully.');
    }

    public function destroy(Lesson $lesson)
    {
        // Ensure the lesson belongs to the authenticated teacher
        if ($lesson->teacher_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this lesson.');
        }

        $lesson->delete();

        return redirect()->route('teacher.lessons.index')
            ->with('success', 'Lesson deleted successfully.');
    }

    /**
     * Get class-subject combinations that the teacher is assigned to teach.
     */
    private function getTeacherAssignedClassSubjects()
    {
        $assignments = DB::table('class_subject')
            ->join('classes', 'class_subject.class_id', '=', 'classes.id')
            ->join('subjects', 'class_subject.subject_id', '=', 'subjects.id')
            ->where('class_subject.teacher_id', auth()->id())
            ->select(
                'classes.id as class_id',
                'classes.name as class_name',
                'classes.code as class_code',
                'subjects.id as subject_id',
                'subjects.name as subject_name',
                'subjects.code as subject_code'
            )
            ->get()
            ->groupBy('class_id')
            ->map(function ($items) {
                $first = $items->first();
                return [
                    'class_id' => $first->class_id,
                    'class_name' => $first->class_name,
                    'class_code' => $first->class_code,
                    'subjects' => $items->map(function ($item) {
                        return [
                            'id' => $item->subject_id,
                            'name' => $item->subject_name,
                            'code' => $item->subject_code,
                        ];
                    })->values()->toArray(),
                ];
            })
            ->values();

        return $assignments;
    }
}
