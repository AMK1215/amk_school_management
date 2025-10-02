import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, User, Calendar, Clock, FileText } from 'lucide-react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Lessons',
        href: '/student/lessons',
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
    subject: {
        name: string;
        code: string;
    };
    teacher: {
        name: string;
    };
    class: {
        name: string;
    };
}

interface ShowLessonProps {
    lesson: Lesson;
}

export default function StudentShowLesson({ lesson }: ShowLessonProps) {
    // Load MathJax for math rendering
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Load MathJax if not already loaded
            if (!window.MathJax) {
                const script = document.createElement('script');
                script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
                script.async = true;
                document.head.appendChild(script);

                const mathJaxScript = document.createElement('script');
                mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
                mathJaxScript.async = true;
                document.head.appendChild(mathJaxScript);

                mathJaxScript.onload = () => {
                    if (window.MathJax) {
                        window.MathJax = {
                            tex: {
                                inlineMath: [['$', '$'], ['\\(', '\\)']],
                                displayMath: [['$$', '$$'], ['\\[', '\\]']]
                            },
                            options: {
                                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
                            }
                        };
                        // Re-render math after MathJax is loaded
                        setTimeout(() => {
                            if (window.MathJax && window.MathJax.typesetPromise) {
                                window.MathJax.typesetPromise();
                            }
                        }, 100);
                    }
                };
            } else {
                // MathJax already loaded, just re-render
                setTimeout(() => {
                    if (window.MathJax && window.MathJax.typesetPromise) {
                        window.MathJax.typesetPromise();
                    }
                }, 100);
            }
        }
    }, [lesson.content]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={lesson.title} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/student/lessons">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
                            <Badge>{lesson.subject.code}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {lesson.subject.name} • By {lesson.teacher.name}
                        </p>
                    </div>
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
                                        No content available for this lesson yet.
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
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Subject</p>
                                        <p className="text-sm text-muted-foreground">
                                            {lesson.subject.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Teacher</p>
                                        <p className="text-sm text-muted-foreground">
                                            {lesson.teacher.name}
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
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/student/lessons">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Lessons
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

