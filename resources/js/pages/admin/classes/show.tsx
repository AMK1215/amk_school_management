import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, GraduationCap, Users, BookOpen, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Classes',
        href: '/admin/classes',
    },
    {
        title: 'Class Details',
        href: '#',
    },
];

interface SchoolClass {
    id: number;
    name: string;
    code: string;
    grade_level: number;
    section: string | null;
    capacity: number;
    is_active: boolean;
    academic_year?: {
        name: string;
        start_date: string;
        end_date: string;
    };
    class_teacher?: {
        id: number;
        name: string;
        email: string;
        phone: string;
    };
    creator?: {
        name: string;
    };
    students?: Array<{
        id: number;
        name: string;
        email: string;
    }>;
    subjects?: Array<{
        id: number;
        name: string;
        code: string;
    }>;
    exams?: Array<{
        id: number;
        title: string;
        exam_date: string;
        creator?: {
            name: string;
        };
    }>;
}

interface ShowClassProps {
    class: SchoolClass;
}

export default function ShowClass({ class: schoolClass }: ShowClassProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={schoolClass.name} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/admin/classes">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">{schoolClass.name}</h1>
                                <Badge variant={schoolClass.is_active ? "default" : "secondary"}>
                                    {schoolClass.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">
                                Code: {schoolClass.code} • Grade {schoolClass.grade_level}
                                {schoolClass.section && ` - ${schoolClass.section}`}
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={`/admin/classes/${schoolClass.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Class
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Class Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Details</CardTitle>
                            <CardDescription>Basic information about this class</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Grade & Section</p>
                                    <p className="text-sm text-muted-foreground">
                                        Grade {schoolClass.grade_level}
                                        {schoolClass.section && ` - ${schoolClass.section}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Capacity</p>
                                    <p className="text-sm text-muted-foreground">
                                        {schoolClass.students?.length || 0} / {schoolClass.capacity} students
                                    </p>
                                </div>
                            </div>
                            {schoolClass.academic_year && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Academic Year</p>
                                        <p className="text-sm text-muted-foreground">{schoolClass.academic_year.name}</p>
                                    </div>
                                </div>
                            )}
                            {schoolClass.creator && (
                                <div>
                                    <p className="text-sm font-medium">Created By</p>
                                    <p className="text-sm text-muted-foreground">{schoolClass.creator.name}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Class Teacher */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Teacher</CardTitle>
                            <CardDescription>Main teacher for this class</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schoolClass.class_teacher ? (
                                <div className="space-y-2">
                                    <p className="font-medium">{schoolClass.class_teacher.name}</p>
                                    <p className="text-sm text-muted-foreground">{schoolClass.class_teacher.email}</p>
                                    <p className="text-sm text-muted-foreground">{schoolClass.class_teacher.phone}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No class teacher assigned</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Subjects */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Subjects</CardTitle>
                            <CardDescription>
                                {schoolClass.subjects?.length || 0} subjects in this class
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schoolClass.subjects && schoolClass.subjects.length > 0 ? (
                                <div className="space-y-2">
                                    {schoolClass.subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center gap-2 p-2 border rounded">
                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{subject.name}</p>
                                                <p className="text-xs text-muted-foreground">{subject.code}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No subjects assigned yet</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Students */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Students</CardTitle>
                            <CardDescription>
                                {schoolClass.students?.length || 0} students enrolled
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schoolClass.students && schoolClass.students.length > 0 ? (
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {schoolClass.students.map((student) => (
                                        <div key={student.id} className="flex items-center justify-between p-2 border rounded">
                                            <div>
                                                <p className="text-sm font-medium">{student.name}</p>
                                                <p className="text-xs text-muted-foreground">{student.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No students enrolled yet</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Exams */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Exams</CardTitle>
                            <CardDescription>
                                {schoolClass.exams?.length || 0} exams scheduled for this class
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schoolClass.exams && schoolClass.exams.length > 0 ? (
                                <div className="space-y-3">
                                    {schoolClass.exams.map((exam) => (
                                        <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium">{exam.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(exam.exam_date).toLocaleDateString()} • 
                                                    Created by {exam.creator?.name || 'Unknown'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No exams scheduled yet</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

