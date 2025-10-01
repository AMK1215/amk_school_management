import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';
import { User as UserIcon, Mail, Phone, GraduationCap, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Dashboard',
        href: '/dashboard',
    },
];

interface StudentDashboardProps {
    teacher: User;
    profile: User;
}

export default function StudentDashboard({ teacher, profile }: StudentDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {profile.name}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* My Profile */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5" />
                                My Profile
                            </CardTitle>
                            <CardDescription>
                                Your student information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{profile.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{profile.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{profile.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Student ID:</span>
                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {profile.user_name}
                                </code>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Status:</span>
                                <Badge variant={profile.status ? "default" : "secondary"}>
                                    {profile.status ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                    Enrolled: {new Date(profile.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* My Teacher */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                My Teacher
                            </CardTitle>
                            <CardDescription>
                                Your assigned teacher
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {teacher ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{teacher.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{teacher.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{teacher.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">Teacher ID:</span>
                                        <code className="text-xs bg-muted px-2 py-1 rounded">
                                            {teacher.user_name}
                                        </code>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No teacher assigned yet.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Academic Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Overview</CardTitle>
                        <CardDescription>
                            Your academic progress and information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold">--</div>
                                <div className="text-sm text-muted-foreground">Attendance Rate</div>
                            </div>
                            <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold">--</div>
                                <div className="text-sm text-muted-foreground">Average Grade</div>
                            </div>
                            <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold">--</div>
                                <div className="text-sm text-muted-foreground">Assignments</div>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                            Academic features will be available once grades and assignments are implemented.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
