import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Teacher } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Mail, Phone, Users, GraduationCap, BookOpen } from 'lucide-react';

interface ShowTeacherProps {
    teacher: Teacher & {
        subjects?: Array<{
            id: number;
            name: string;
            code: string;
            pivot?: {
                academic_year_id: number;
            };
        }>;
    };
}

export default function ShowTeacher({ teacher }: ShowTeacherProps) {
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
            title: teacher.name,
            href: `/admin/teachers/${teacher.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Teacher: ${teacher.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/teachers">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold tracking-tight">{teacher.name}</h1>
                        <p className="text-muted-foreground">
                            Teacher Details and Student Management
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/admin/teachers/${teacher.id}/assign-subjects`}>
                                <BookOpen className="mr-2 h-4 w-4" />
                                Assign Subjects
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={`/admin/teachers/${teacher.id}/assign-classes`}>
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Assign Classes
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={`/admin/teachers/${teacher.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Teacher
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Teacher Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Teacher Information</CardTitle>
                            <CardDescription>
                                Basic details about this teacher
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{teacher.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Username:</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {teacher.user_name}
                                </code>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Status:</span>
                                <Badge variant={teacher.status ? "default" : "secondary"}>
                                    {teacher.status ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{teacher.students_count || 0} Students</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assigned Subjects */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Assigned Subjects ({teacher.subjects?.length || 0})
                            </CardTitle>
                            <CardDescription>
                                Subjects this teacher is assigned to teach
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {teacher.subjects && teacher.subjects.length > 0 ? (
                                <div className="space-y-2">
                                    {teacher.subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center justify-between p-2 border rounded">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{subject.name}</p>
                                                    <p className="text-xs text-muted-foreground">{subject.code}</p>
                                                </div>
                                            </div>
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
                                        Assign subjects
                                    </Link>
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Students List - Full Width */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Students ({teacher.students?.length || 0})
                        </CardTitle>
                        <CardDescription>
                            Students assigned to this teacher
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {teacher.students && teacher.students.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {teacher.students.map((student) => (
                                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-xs text-muted-foreground">{student.email}</p>
                                        </div>
                                        <Badge variant={student.status ? "default" : "secondary"}>
                                            {student.status ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No students assigned to this teacher yet.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
