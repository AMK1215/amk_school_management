import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus, Eye, Edit, Trash2, BookOpen, GraduationCap, Calendar, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Lessons',
        href: '/teacher/lessons',
    },
];

interface Lesson {
    id: number;
    title: string;
    description: string | null;
    lesson_date: string | null;
    duration_minutes: number | null;
    status: 'draft' | 'published';
    class: {
        name: string;
        code: string;
    };
    subject: {
        name: string;
        code: string;
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

export default function LessonsIndex({ lessons }: LessonsIndexProps) {
    const handleDelete = (lessonId: number) => {
        if (confirm('Are you sure you want to delete this lesson?')) {
            router.delete(`/teacher/lessons/${lessonId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Lessons" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Lessons</h1>
                        <p className="text-muted-foreground">
                            Manage lessons for your assigned classes
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/teacher/lessons/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Lesson
                        </Link>
                    </Button>
                </div>

                {/* Lessons Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Lessons</CardTitle>
                        <CardDescription>
                            Total: {lessons.total} lessons
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {lessons.data.length > 0 ? (
                                    lessons.data.map((lesson) => (
                                        <TableRow key={lesson.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    {lesson.title}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium">{lesson.class.name}</p>
                                                        <p className="text-xs text-muted-foreground">{lesson.class.code}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="text-sm font-medium">{lesson.subject.name}</p>
                                                    <p className="text-xs text-muted-foreground">{lesson.subject.code}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {lesson.lesson_date ? (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm">
                                                            {new Date(lesson.lesson_date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {lesson.duration_minutes ? (
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm">{lesson.duration_minutes} min</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={lesson.status === 'published' ? "default" : "secondary"}>
                                                    {lesson.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/teacher/lessons/${lesson.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/teacher/lessons/${lesson.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            onClick={() => handleDelete(lesson.id)}
                                                            className="text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            <div className="text-muted-foreground">
                                                No lessons created yet. 
                                                <Link href="/teacher/lessons/create" className="text-primary hover:underline ml-1">
                                                    Create your first lesson
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

