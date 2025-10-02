import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CKEditorComponent from '@/components/ckeditor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Edit Lesson',
        href: '#',
    },
];

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface ClassSubject {
    class_id: number;
    class_name: string;
    class_code: string;
    subjects: Subject[];
}

interface Lesson {
    id: number;
    title: string;
    description: string | null;
    content: string | null;
    class_id: number;
    subject_id: number;
    lesson_date: string | null;
    duration_minutes: number | null;
    status: 'draft' | 'published';
}

interface EditLessonProps {
    lesson: Lesson;
    classSubjects: ClassSubject[];
}

export default function EditLesson({ lesson, classSubjects }: EditLessonProps) {
    const [selectedClass, setSelectedClass] = useState<number>(lesson.class_id);

    const { data, setData, put, processing, errors } = useForm({
        title: lesson.title,
        description: lesson.description || '',
        content: lesson.content || '',
        class_id: lesson.class_id,
        subject_id: lesson.subject_id,
        lesson_date: lesson.lesson_date || '',
        duration_minutes: lesson.duration_minutes || 60,
        status: lesson.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/teacher/lessons/${lesson.id}`);
    };

    const selectedClassData = classSubjects.find(cs => cs.class_id === selectedClass);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${lesson.title}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/teacher/lessons">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Lesson</h1>
                        <p className="text-muted-foreground">
                            Update lesson details
                        </p>
                    </div>
                </div>

                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle>Lesson Details</CardTitle>
                        <CardDescription>
                            Update the details for {lesson.title}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Class Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="class_id">Class *</Label>
                                    <Select 
                                        value={data.class_id.toString()} 
                                        onValueChange={(value) => {
                                            setData('class_id', parseInt(value));
                                            setSelectedClass(parseInt(value));
                                            setData('subject_id', ''); // Reset subject when class changes
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classSubjects.map((cs) => (
                                                <SelectItem key={cs.class_id} value={cs.class_id.toString()}>
                                                    {cs.class_name} ({cs.class_code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.class_id && (
                                        <p className="text-sm text-destructive">{errors.class_id}</p>
                                    )}
                                </div>

                                {/* Subject Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject_id">Subject *</Label>
                                    <Select 
                                        value={data.subject_id.toString()} 
                                        onValueChange={(value) => setData('subject_id', parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectedClassData?.subjects.map((subject) => (
                                                <SelectItem key={subject.id} value={subject.id.toString()}>
                                                    {subject.name} ({subject.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.subject_id && (
                                        <p className="text-sm text-destructive">{errors.subject_id}</p>
                                    )}
                                </div>

                                {/* Lesson Title */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="title">Lesson Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter lesson title"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title}</p>
                                    )}
                                </div>

                                {/* Lesson Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="lesson_date">Lesson Date</Label>
                                    <Input
                                        id="lesson_date"
                                        type="date"
                                        value={data.lesson_date}
                                        onChange={(e) => setData('lesson_date', e.target.value)}
                                    />
                                    {errors.lesson_date && (
                                        <p className="text-sm text-destructive">{errors.lesson_date}</p>
                                    )}
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                    <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                                    <Input
                                        id="duration_minutes"
                                        type="number"
                                        min="1"
                                        max="480"
                                        value={data.duration_minutes}
                                        onChange={(e) => setData('duration_minutes', parseInt(e.target.value))}
                                    />
                                    {errors.duration_minutes && (
                                        <p className="text-sm text-destructive">{errors.duration_minutes}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select value={data.status} onValueChange={(value: 'draft' | 'published') => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-destructive">{errors.status}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Short Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Brief description of the lesson"
                                        rows={3}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">{errors.description}</p>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="content">Lesson Content</Label>
                                    <div className="border rounded-md">
                                        <CKEditorComponent
                                            value={data.content}
                                            onChange={(content) => setData('content', content)}
                                            placeholder="Detailed lesson content, notes, materials, etc."
                                            className="min-h-[300px]"
                                        />
                                    </div>
                                    {errors.content && (
                                        <p className="text-sm text-destructive">{errors.content}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Lesson'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/teacher/lessons">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

