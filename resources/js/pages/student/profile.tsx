import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { User as UserIcon, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Profile',
        href: '/student/profile',
    },
];

export default function StudentProfile() {
    const { auth } = usePage().props as any;
    const student = auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Profile" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                    <p className="text-muted-foreground">
                        View your student information and details
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5" />
                                Personal Information
                            </CardTitle>
                            <CardDescription>
                                Your basic information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4 text-muted-foreground" />
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
                                <span className="text-sm font-medium">Student ID:</span>
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
                                    Enrolled: {new Date(student.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Academic Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Academic Status
                            </CardTitle>
                            <CardDescription>
                                Your academic progress and achievements
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="text-center p-4 border rounded">
                                    <div className="text-2xl font-bold">--</div>
                                    <div className="text-sm text-muted-foreground">Current GPA</div>
                                </div>
                                <div className="text-center p-4 border rounded">
                                    <div className="text-2xl font-bold">--</div>
                                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                                </div>
                                <div className="text-center p-4 border rounded">
                                    <div className="text-2xl font-bold">--</div>
                                    <div className="text-sm text-muted-foreground">Completed Assignments</div>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Academic tracking features will be available once grades and assignments modules are implemented.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
