<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$teacherId = 6; // Teacher 5 in the database

echo "=== TEACHER 5 ASSIGNMENTS ===\n\n";

// Check teacher_subject table
echo "1. SUBJECTS ASSIGNED (teacher_subject table):\n";
$teacherSubjects = DB::table('teacher_subject')
    ->join('subjects', 'teacher_subject.subject_id', '=', 'subjects.id')
    ->where('teacher_subject.teacher_id', $teacherId)
    ->select('subjects.name', 'subjects.code', 'teacher_subject.academic_year_id')
    ->get();

if ($teacherSubjects->count() > 0) {
    foreach ($teacherSubjects as $ts) {
        echo "  ✅ {$ts->code} - {$ts->name} (Academic Year ID: {$ts->academic_year_id})\n";
    }
} else {
    echo "  ❌ No subjects assigned\n";
}

echo "\n2. CLASSES ASSIGNED (class_subject table):\n";
$classSubjects = DB::table('class_subject')
    ->join('classes', 'class_subject.class_id', '=', 'classes.id')
    ->join('subjects', 'class_subject.subject_id', '=', 'subjects.id')
    ->where('class_subject.teacher_id', $teacherId)
    ->select(
        'classes.name as class_name',
        'classes.code as class_code',
        'subjects.name as subject_name',
        'subjects.code as subject_code',
        'class_subject.teacher_id'
    )
    ->get();

if ($classSubjects->count() > 0) {
    foreach ($classSubjects as $cs) {
        echo "  ✅ Class: {$cs->class_name} ({$cs->class_code}) | Subject: {$cs->subject_code} - {$cs->subject_name}\n";
    }
} else {
    echo "  ❌ No classes assigned (teacher_id not set in class_subject table)\n";
}

echo "\n3. ALL class_subject RECORDS:\n";
$allClassSubjects = DB::table('class_subject')
    ->join('classes', 'class_subject.class_id', '=', 'classes.id')
    ->join('subjects', 'class_subject.subject_id', '=', 'subjects.id')
    ->select(
        'class_subject.id',
        'classes.name as class_name',
        'subjects.name as subject_name',
        'class_subject.teacher_id'
    )
    ->get();

foreach ($allClassSubjects as $cs) {
    echo "  ID: {$cs->id} | Class: {$cs->class_name} | Subject: {$cs->subject_name} | Teacher ID: " . ($cs->teacher_id ?? 'NULL') . "\n";
}

echo "\n";

