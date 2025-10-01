import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Shield, GraduationCap, Calendar, BookOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guardian Dashboard',
        href: '/dashboard',
    },
];

interface GuardianDashboardProps {
    message: string;
}

export default function GuardianDashboard({ message }: GuardianDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Guardian Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Guardian Dashboard</h1>
                    <p className="text-muted-foreground">
                        Monitor your ward's academic progress and wellbeing
                    </p>
                </div>

                {/* Welcome Message */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Welcome
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{message}</p>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* My Wards */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                My Wards
                            </CardTitle>
                            <CardDescription>
                                Students under your guardianship
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                Ward management features will be available once guardian-ward relationships are fully implemented.
                            </div>
                            
                            {/* Placeholder for wards list */}
                            <div className="mt-4 space-y-2">
                                <div className="text-center p-8 border rounded border-dashed">
                                    <Shield className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        No wards linked to your account yet.
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
                                Overall academic performance of your wards
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
                                Academic tracking will be available once guardian-ward relationships are established.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Guardian Resources */}
                <Card>
                    <CardHeader>
                        <CardTitle>Guardian Resources</CardTitle>
                        <CardDescription>
                            Helpful resources for guardians
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="p-4 border rounded">
                                <h4 className="font-medium">School Policies</h4>
                                <p className="text-sm text-muted-foreground">Review school rules and guidelines</p>
                            </div>
                            <div className="p-4 border rounded">
                                <h4 className="font-medium">Emergency Contacts</h4>
                                <p className="text-sm text-muted-foreground">Important school contact information</p>
                            </div>
                            <div className="p-4 border rounded">
                                <h4 className="font-medium">School Calendar</h4>
                                <p className="text-sm text-muted-foreground">View upcoming events and holidays</p>
                            </div>
                            <div className="p-4 border rounded">
                                <h4 className="font-medium">Support Services</h4>
                                <p className="text-sm text-muted-foreground">Access to counseling and support</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
