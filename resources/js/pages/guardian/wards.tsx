import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Shield, GraduationCap, User, Mail, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guardian Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Wards',
        href: '/guardian/wards',
    },
];

export default function GuardianWards() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Wards" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Wards</h1>
                    <p className="text-muted-foreground">
                        View and monitor your wards' academic progress and wellbeing
                    </p>
                </div>

                {/* Wards List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Ward Information
                        </CardTitle>
                        <CardDescription>
                            Details about students under your guardianship
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder - will be populated when guardian-ward relationships are implemented */}
                        <div className="text-center p-8 border rounded border-dashed">
                            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="font-medium mb-2">No Wards Found</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                No students are currently under your guardianship.
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Contact the school administration to establish guardianship relationships.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Academic Overview
                        </CardTitle>
                        <CardDescription>
                            Overall academic performance of your wards
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold">--</div>
                                <div className="text-sm text-muted-foreground">Average GPA</div>
                            </div>
                            <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold">--</div>
                                <div className="text-sm text-muted-foreground">Attendance Rate</div>
                            </div>
                            <div className="text-center p-4 border rounded">
                                <div className="text-2xl font-bold">--</div>
                                <div className="text-sm text-muted-foreground">Active Wards</div>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                            Academic data will be displayed once wards are linked to your account.
                        </div>
                    </CardContent>
                </Card>

                {/* Guardian Resources */}
                <Card>
                    <CardHeader>
                        <CardTitle>Guardian Resources</CardTitle>
                        <CardDescription>
                            Important information and resources for guardians
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-2">Emergency Procedures</h4>
                                <p className="text-sm text-muted-foreground">
                                    Learn about emergency protocols and contacts
                                </p>
                            </div>
                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-2">Legal Documents</h4>
                                <p className="text-sm text-muted-foreground">
                                    Access guardianship documents and forms
                                </p>
                            </div>
                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-2">School Policies</h4>
                                <p className="text-sm text-muted-foreground">
                                    Review school rules and guardian responsibilities
                                </p>
                            </div>
                            <div className="p-4 border rounded">
                                <h4 className="font-medium mb-2">Support Services</h4>
                                <p className="text-sm text-muted-foreground">
                                    Access counseling and support resources
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
