<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('creator')
            ->withCount(['teachers', 'exams'])
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('admin/subjects/index', [
            'subjects' => $subjects,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/subjects/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:subjects',
            'description' => 'nullable|string',
            'credit_hours' => 'required|integer|min:1|max:10',
            'is_active' => 'boolean',
        ]);

        Subject::create([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'description' => $request->description,
            'credit_hours' => $request->credit_hours,
            'is_active' => $request->is_active ?? true,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('admin.subjects.index')
            ->with('success', 'Subject created successfully.');
    }

    public function show(Subject $subject)
    {
        $subject->load(['creator', 'teachers', 'classes', 'exams.creator']);

        return Inertia::render('admin/subjects/show', [
            'subject' => $subject,
        ]);
    }

    public function edit(Subject $subject)
    {
        return Inertia::render('admin/subjects/edit', [
            'subject' => $subject,
        ]);
    }

    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:subjects,code,' . $subject->id,
            'description' => 'nullable|string',
            'credit_hours' => 'required|integer|min:1|max:10',
            'is_active' => 'boolean',
        ]);

        $subject->update([
            'name' => $request->name,
            'code' => strtoupper($request->code),
            'description' => $request->description,
            'credit_hours' => $request->credit_hours,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('admin.subjects.index')
            ->with('success', 'Subject updated successfully.');
    }

    public function destroy(Subject $subject)
    {
        if ($subject->exams()->count() > 0) {
            return redirect()->route('admin.subjects.index')
                ->with('error', 'Cannot delete subject with existing exams.');
        }

        $subject->delete();

        return redirect()->route('admin.subjects.index')
            ->with('success', 'Subject deleted successfully.');
    }
}