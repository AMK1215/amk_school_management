import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Calendar, Clock, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Lessons',
        href: '/student/lessons',
    },
];

interface Lesson {
    id: number;
    title: string;
    description: string | null;
    lesson_date: string | null;
    duration_minutes: number | null;
    subject: {
        name: string;
        code: string;
    };
    teacher: {
        name: string;
    };
}

interface LessonsIndexProps {
    lessons: {
        data: Lesson[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function StudentLessonsIndex({ lessons }: LessonsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Lessons" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Lessons</h1>
                    <p className="text-muted-foreground">
                        View lessons shared by your teachers
                    </p>
                </div>

                {/* Lessons List */}
                {lessons.data.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {lessons.data.map((lesson) => (
                            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <Badge variant="outline">{lesson.subject.code}</Badge>
                                        {lesson.lesson_date && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(lesson.lesson_date).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                    <CardTitle className="mt-2">{lesson.title}</CardTitle>
                                    <CardDescription>
                                        {lesson.description || 'No description available'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                            <span>{lesson.subject.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span>{lesson.teacher.name}</span>
                                        </div>
                                        {lesson.duration_minutes && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span>{lesson.duration_minutes} minutes</span>
                                            </div>
                                        )}
                                        <Button asChild className="w-full mt-4">
                                            <Link href={`/student/lessons/${lesson.id}`}>
                                                View Lesson
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="py-12">
                            <div className="text-center text-muted-foreground">
                                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium">No lessons available yet</p>
                                <p className="text-sm mt-2">Check back later for new lessons from your teachers</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

