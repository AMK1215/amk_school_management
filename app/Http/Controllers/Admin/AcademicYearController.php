<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicYearController extends Controller
{
    public function index()
    {
        $academicYears = AcademicYear::with('creator')
            ->orderBy('start_date', 'desc')
            ->paginate(10);

        return Inertia::render('admin/academic-years/index', [
            'academicYears' => $academicYears,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/academic-years/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:academic_years',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // If setting this as active, deactivate others
        if ($request->is_active) {
            AcademicYear::where('is_active', true)->update(['is_active' => false]);
        }

        AcademicYear::create([
            'name' => $request->name,
            'code' => $request->code,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'description' => $request->description,
            'is_active' => $request->is_active ?? false,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('admin.academic-years.index')
            ->with('success', 'Academic year created successfully.');
    }

    public function show(AcademicYear $academicYear)
    {
        $academicYear->load(['creator', 'classes.classTeacher', 'exams.subject']);

        return Inertia::render('admin/academic-years/show', [
            'academicYear' => $academicYear,
        ]);
    }

    public function edit(AcademicYear $academicYear)
    {
        return Inertia::render('admin/academic-years/edit', [
            'academicYear' => $academicYear,
        ]);
    }

    public function update(Request $request, AcademicYear $academicYear)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:academic_years,code,' . $academicYear->id,
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // If setting this as active, deactivate others
        if ($request->is_active && !$academicYear->is_active) {
            AcademicYear::where('is_active', true)->update(['is_active' => false]);
        }

        $academicYear->update([
            'name' => $request->name,
            'code' => $request->code,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'description' => $request->description,
            'is_active' => $request->is_active ?? false,
        ]);

        return redirect()->route('admin.academic-years.index')
            ->with('success', 'Academic year updated successfully.');
    }

    public function destroy(AcademicYear $academicYear)
    {
        if ($academicYear->classes()->count() > 0) {
            return redirect()->route('admin.academic-years.index')
                ->with('error', 'Cannot delete academic year with existing classes.');
        }

        $academicYear->delete();

        return redirect()->route('admin.academic-years.index')
            ->with('success', 'Academic year deleted successfully.');
    }
}