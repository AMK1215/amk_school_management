import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type DashboardStats, type Student } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Plus, Users, UserCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher Dashboard',
        href: '/dashboard',
    },
];

interface TeacherDashboardProps {
    stats: DashboardStats;
    recent_students: Student[];
}

export default function TeacherDashboard({ stats, recent_students }: TeacherDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teacher Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
                        <p className="text-muted-foreground">
                            Manage your students and classroom
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/teacher/students/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Student
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_students || 0}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.active_students || 0}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Students and Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Recent Students</CardTitle>
                            <CardDescription>
                                Latest students added to your class
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_students.length > 0 ? (
                                    recent_students.map((student) => (
                                        <div key={student.id} className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{student.name}</p>
                                                <p className="text-xs text-muted-foreground">{student.email}</p>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {student.user_name}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No students found</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common classroom management tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/teacher/students/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add New Student
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/teacher/students">
                                        <Users className="mr-2 h-4 w-4" />
                                        Manage Students
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
