import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Baby, GraduationCap, Calendar, BookOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Parent Dashboard',
        href: '/dashboard',
    },
];

interface ParentDashboardProps {
    message: string;
}

export default function ParentDashboard({ message }: ParentDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Parent Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
                    <p className="text-muted-foreground">
                        Monitor your children's academic progress
                    </p>
                </div>

                {/* Welcome Message */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Baby className="h-5 w-5" />
                            Welcome
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{message}</p>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* My Children */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                My Children
                            </CardTitle>
                            <CardDescription>
                                Your children's information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                Children management features will be available once parent-child relationships are fully implemented.
                            </div>
                            
                            {/* Placeholder for children list */}
                            <div className="mt-4 space-y-2">
                                <div className="text-center p-8 border rounded border-dashed">
                                    <Baby className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        No children linked to your account yet.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Academic Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Academic Overview
                            </CardTitle>
                            <CardDescription>
                                Overall academic performance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="text-center p-4 border rounded">
                                    <div className="text-2xl font-bold">--</div>
                                    <div className="text-sm text-muted-foreground">Average GPA</div>
                                </div>
                                <div className="text-center p-4 border rounded">
                                    <div className="text-2xl font-bold">--</div>
                                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-muted-foreground">
                                Academic tracking will be available once parent-child relationships are established.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Links</CardTitle>
                        <CardDescription>
                            Useful resources for parents
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="p-4 border rounded">
                                <h4 className="font-medium">School Calendar</h4>
                                <p className="text-sm text-muted-foreground">View upcoming events and holidays</p>
                            </div>
                            <div className="p-4 border rounded">
                                <h4 className="font-medium">Contact Teachers</h4>
                                <p className="text-sm text-muted-foreground">Get in touch with your child's teachers</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
