import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, BookOpen, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Subjects',
        href: '/admin/subjects',
    },
    {
        title: 'Subject Details',
        href: '#',
    },
];

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string | null;
    credit_hours: number;
    is_active: boolean;
    creator?: {
        name: string;
    };
    teachers?: Array<{
        id: number;
        name: string;
        email: string;
    }>;
    exams?: Array<{
        id: number;
        title: string;
        exam_date: string;
        creator?: {
            name: string;
        };
    }>;
}

interface ShowSubjectProps {
    subject: Subject;
}

export default function ShowSubject({ subject }: ShowSubjectProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={subject.name} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/admin/subjects">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
                                <Badge variant={subject.is_active ? "default" : "secondary"}>
                                    {subject.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">
                                Code: {subject.code} • {subject.credit_hours} Credit Hours
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={`/admin/subjects/${subject.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Subject
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Subject Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Subject Details</CardTitle>
                            <CardDescription>Basic information about this subject</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Subject Code</p>
                                    <p className="text-sm text-muted-foreground">{subject.code}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Credit Hours</p>
                                    <p className="text-sm text-muted-foreground">{subject.credit_hours} hours</p>
                                </div>
                            </div>
                            {subject.description && (
                                <div>
                                    <p className="text-sm font-medium">Description</p>
                                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                                </div>
                            )}
                            {subject.creator && (
                                <div>
                                    <p className="text-sm font-medium">Created By</p>
                                    <p className="text-sm text-muted-foreground">{subject.creator.name}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Teachers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Assigned Teachers</CardTitle>
                            <CardDescription>
                                {subject.teachers?.length || 0} teachers assigned
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {subject.teachers && subject.teachers.length > 0 ? (
                                <div className="space-y-3">
                                    {subject.teachers.map((teacher) => (
                                        <div key={teacher.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">{teacher.name}</p>
                                                <p className="text-xs text-muted-foreground">{teacher.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No teachers assigned yet</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Exams */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Exams</CardTitle>
                            <CardDescription>
                                {subject.exams?.length || 0} exams for this subject
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {subject.exams && subject.exams.length > 0 ? (
                                <div className="space-y-3">
                                    {subject.exams.map((exam) => (
                                        <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium">{exam.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(exam.exam_date).toLocaleDateString()} • 
                                                    Created by {exam.creator?.name || 'Unknown'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No exams created yet</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

