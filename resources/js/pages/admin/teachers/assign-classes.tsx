import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, GraduationCap, BookOpen } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Teachers',
        href: '/admin/teachers',
    },
    {
        title: 'Assign Classes',
        href: '#',
    },
];

interface Teacher {
    id: number;
    name: string;
    subjects: Array<{
        id: number;
        name: string;
        code: string;
    }>;
}

interface SchoolClass {
    id: number;
    name: string;
    code: string;
    grade_level: number;
    section: string | null;
    subjects: Array<{
        id: number;
        name: string;
        code: string;
    }>;
}

interface Assignment {
    class_id: number;
    subject_id: number;
}

interface AssignClassesProps {
    teacher: Teacher;
    classes: SchoolClass[];
    currentAssignments: Assignment[];
}

export default function AssignClasses({ teacher, classes, currentAssignments }: AssignClassesProps) {
    const { data, setData, post, processing } = useForm({
        assignments: currentAssignments,
    });

    const isAssigned = (classId: number, subjectId: number) => {
        return data.assignments.some(a => a.class_id === classId && a.subject_id === subjectId);
    };

    const toggleAssignment = (classId: number, subjectId: number) => {
        if (isAssigned(classId, subjectId)) {
            setData('assignments', data.assignments.filter(a => !(a.class_id === classId && a.subject_id === subjectId)));
        } else {
            setData('assignments', [...data.assignments, { class_id: classId, subject_id: subjectId }]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/teachers/${teacher.id}/assign-classes`);
    };

    // Get teacher's subject IDs for quick lookup
    const teacherSubjectIds = teacher.subjects.map(s => s.id);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign Classes - ${teacher.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/teachers/${teacher.id}`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assign Classes</h1>
                        <p className="text-muted-foreground">
                            Assign {teacher.name} to teach subjects in specific classes
                        </p>
                    </div>
                </div>

                {/* Teacher's Subjects Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Teacher's Assigned Subjects</CardTitle>
                        <CardDescription>
                            {teacher.name} can teach these subjects in classes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {teacher.subjects.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {teacher.subjects.map((subject) => (
                                    <div key={subject.id} className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm font-medium">{subject.code}</span>
                                        <span className="text-sm text-muted-foreground">-</span>
                                        <span className="text-sm">{subject.name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No subjects assigned yet. 
                                <Link 
                                    href={`/admin/teachers/${teacher.id}/assign-subjects`}
                                    className="text-primary hover:underline ml-1"
                                >
                                    Assign subjects first
                                </Link>
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Classes List */}
                    {classes.length > 0 ? (
                        <div className="grid gap-4">
                            {classes.map((schoolClass) => {
                                // Filter subjects that both teacher can teach AND class has
                                const commonSubjects = schoolClass.subjects.filter(s => 
                                    teacherSubjectIds.includes(s.id)
                                );

                                if (commonSubjects.length === 0) return null;

                                return (
                                    <Card key={schoolClass.id}>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <GraduationCap className="h-5 w-5" />
                                                {schoolClass.name}
                                                <span className="text-sm text-muted-foreground font-normal">
                                                    ({schoolClass.code})
                                                </span>
                                            </CardTitle>
                                            <CardDescription>
                                                Grade {schoolClass.grade_level}
                                                {schoolClass.section && ` - ${schoolClass.section}`}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Label className="text-sm font-medium mb-3 block">
                                                Select subjects to teach in this class:
                                            </Label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {commonSubjects.map((subject) => (
                                                    <div 
                                                        key={subject.id}
                                                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50"
                                                    >
                                                        <Checkbox
                                                            id={`${schoolClass.id}-${subject.id}`}
                                                            checked={isAssigned(schoolClass.id, subject.id)}
                                                            onCheckedChange={() => toggleAssignment(schoolClass.id, subject.id)}
                                                        />
                                                        <label
                                                            htmlFor={`${schoolClass.id}-${subject.id}`}
                                                            className="flex items-center gap-2 cursor-pointer flex-1"
                                                        >
                                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                            <div>
                                                                <p className="text-sm font-medium leading-none">
                                                                    {subject.name}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    {subject.code}
                                                                </p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="py-8">
                                <p className="text-sm text-muted-foreground text-center">
                                    No active classes available
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Summary */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm">
                            <span className="font-semibold">{data.assignments.length}</span> class-subject combination(s) selected
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={processing || data.assignments.length === 0}>
                            {processing ? 'Assigning...' : 'Assign Classes'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href={`/admin/teachers/${teacher.id}`}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

