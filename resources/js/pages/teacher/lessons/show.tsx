import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, BookOpen, GraduationCap, Calendar, Clock, FileText } from 'lucide-react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Lessons',
        href: '/teacher/lessons',
    },
    {
        title: 'Lesson Details',
        href: '#',
    },
];

interface Lesson {
    id: number;
    title: string;
    description: string | null;
    content: string | null;
    lesson_date: string | null;
    duration_minutes: number | null;
    status: 'draft' | 'published';
    created_at: string;
    class: {
        name: string;
        code: string;
        grade_level: number;
        section: string | null;
    };
    subject: {
        name: string;
        code: string;
    };
}

interface ShowLessonProps {
    lesson: Lesson;
}

export default function ShowLesson({ lesson }: ShowLessonProps) {
    // Load MathJax for math rendering
    useEffect(() => {
        if (typeof window !== 'undefined' && window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }, [lesson.content]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={lesson.title} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/teacher/lessons">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
                                <Badge variant={lesson.status === 'published' ? "default" : "secondary"}>
                                    {lesson.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">
                                {lesson.class.name} • {lesson.subject.name}
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={`/teacher/lessons/${lesson.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Lesson
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Description */}
                        {lesson.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{lesson.description}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Content */}
                        {lesson.content && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Lesson Content
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div 
                                        className="prose prose-sm max-w-none dark:prose-invert"
                                        dangerouslySetInnerHTML={{ __html: lesson.content }}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {!lesson.description && !lesson.content && (
                            <Card>
                                <CardContent className="py-8">
                                    <p className="text-center text-muted-foreground">
                                        No content added yet.
                                        <Link 
                                            href={`/teacher/lessons/${lesson.id}/edit`}
                                            className="text-primary hover:underline ml-1"
                                        >
                                            Add content
                                        </Link>
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Lesson Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Lesson Information</CardTitle>
                                <CardDescription>Basic details about this lesson</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Class</p>
                                        <p className="text-sm text-muted-foreground">
                                            {lesson.class.name} ({lesson.class.code})
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Subject</p>
                                        <p className="text-sm text-muted-foreground">
                                            {lesson.subject.name} ({lesson.subject.code})
                                        </p>
                                    </div>
                                </div>
                                {lesson.lesson_date && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">Lesson Date</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(lesson.lesson_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {lesson.duration_minutes && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">Duration</p>
                                            <p className="text-sm text-muted-foreground">
                                                {lesson.duration_minutes} minutes
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium">Created</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(lesson.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href={`/teacher/lessons/${lesson.id}/edit`}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Lesson
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/teacher/lessons/create">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Create Similar
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

