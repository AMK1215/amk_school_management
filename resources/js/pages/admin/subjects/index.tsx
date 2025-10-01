import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus, Eye, Edit, Trash2, BookOpen, Users, GraduationCap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Subjects',
        href: '/admin/subjects',
    },
];

interface Subject {
    id: number;
    name: string;
    code: string;
    description: string | null;
    credit_hours: number;
    is_active: boolean;
    created_by: number;
    teachers_count?: number;
    exams_count?: number;
    creator?: {
        name: string;
    };
}

interface SubjectsIndexProps {
    subjects: {
        data: Subject[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function SubjectsIndex({ subjects }: SubjectsIndexProps) {
    const handleDelete = (subjectId: number) => {
        if (confirm('Are you sure you want to delete this subject?')) {
            router.delete(`/admin/subjects/${subjectId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subjects Management" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Subjects Management</h1>
                        <p className="text-muted-foreground">
                            Manage all subjects in your school curriculum
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/subjects/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Subject
                        </Link>
                    </Button>
                </div>

                {/* Subjects Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Subjects</CardTitle>
                        <CardDescription>
                            Total: {subjects.total} subjects
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Credit Hours</TableHead>
                                    <TableHead>Teachers</TableHead>
                                    <TableHead>Exams</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subjects.data.length > 0 ? (
                                    subjects.data.map((subject) => (
                                        <TableRow key={subject.id}>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-2 py-1 rounded font-semibold">
                                                    {subject.code}
                                                </code>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    {subject.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{subject.credit_hours} hrs</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    {subject.teachers_count || 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    {subject.exams_count || 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={subject.is_active ? "default" : "secondary"}>
                                                    {subject.is_active ? "Active" : "Inactive"}
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
                                                            <Link href={`/admin/subjects/${subject.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/subjects/${subject.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            onClick={() => handleDelete(subject.id)}
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
                                                No subjects found. 
                                                <Link href="/admin/subjects/create" className="text-primary hover:underline ml-1">
                                                    Create your first subject
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

