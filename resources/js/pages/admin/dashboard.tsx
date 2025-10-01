import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type DashboardStats, type Teacher } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Plus, Users, UserPlus, Baby, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
];

interface AdminDashboardProps {
    stats: DashboardStats;
    recent_teachers: Teacher[];
}

export default function AdminDashboard({ stats, recent_teachers }: AdminDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground">
                            Manage your school system from here
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/teachers/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Teacher
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_teachers || 0}</div>
                        </CardContent>
                    </Card>
                    
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
                            <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
                            <Baby className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_parents || 0}</div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Guardians</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_guardians || 0}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Teachers */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Recent Teachers</CardTitle>
                            <CardDescription>
                                Latest teachers added to the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_teachers.length > 0 ? (
                                    recent_teachers.map((teacher) => (
                                        <div key={teacher.id} className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{teacher.name}</p>
                                                <p className="text-xs text-muted-foreground">{teacher.email}</p>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {teacher.students_count || 0} students
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No teachers found</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common administrative tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/admin/teachers/create">
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Add New Teacher
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/admin/teachers">
                                        <Users className="mr-2 h-4 w-4" />
                                        Manage Teachers
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
