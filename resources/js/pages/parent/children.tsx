import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Baby, GraduationCap, User, Mail, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Parent Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Children',
        href: '/parent/children',
    },
];

export default function ParentChildren() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Children" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
                    <p className="text-muted-foreground">
                        View and monitor your children's academic progress
                    </p>
                </div>

                {/* Children List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Baby className="h-5 w-5" />
                            Children Information
                        </CardTitle>
                        <CardDescription>
                            Details about your children in the school system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder - will be populated when parent-child relationships are implemented */}
                        <div className="text-center p-8 border rounded border-dashed">
                            <Baby className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="font-medium mb-2">No Children Found</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                No children are currently linked to your parent account.
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Contact the school administration to link your children to your account.
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
                            Overall academic performance of your children
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
                                <div className="text-sm text-muted-foreground">Active Children</div>
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                            Academic data will be displayed once children are linked to your account.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
