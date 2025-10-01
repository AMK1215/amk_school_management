import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Student } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Mail, Phone, User, Calendar } from 'lucide-react';

interface ShowStudentProps {
    student: Student;
}

export default function ShowStudent({ student }: ShowStudentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Teacher Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Students',
            href: '/teacher/students',
        },
        {
            title: student.name,
            href: `/teacher/students/${student.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Student: ${student.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/teacher/students">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold tracking-tight">{student.name}</h1>
                        <p className="text-muted-foreground">
                            Student Details and Information
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={`/teacher/students/${student.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Student
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Student Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Information</CardTitle>
                            <CardDescription>
                                Basic details about this student
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{student.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{student.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{student.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Username:</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {student.user_name}
                                </code>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Status:</span>
                                <Badge variant={student.status ? "default" : "secondary"}>
                                    {student.status ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                    Joined: {new Date(student.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Academic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Academic Information</CardTitle>
                            <CardDescription>
                                Academic details and progress
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm text-muted-foreground">
                                Academic information will be available once grades and assignments are implemented.
                            </div>
                            
                            {/* Placeholder for future academic features */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm">Attendance Rate:</span>
                                    <span className="text-sm font-medium">--</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Average Grade:</span>
                                    <span className="text-sm font-medium">--</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Assignments Completed:</span>
                                    <span className="text-sm font-medium">--</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
