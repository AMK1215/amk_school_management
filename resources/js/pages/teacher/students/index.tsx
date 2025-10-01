import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Student } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/teacher/students',
    },
];

interface StudentsIndexProps {
    students: {
        data: Student[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function StudentsIndex({ students }: StudentsIndexProps) {
    const handleDelete = (studentId: number) => {
        if (confirm('Are you sure you want to delete this student?')) {
            router.delete(`/teacher/students/${studentId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Students" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Students</h1>
                        <p className="text-muted-foreground">
                            Manage students in your classroom
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/teacher/students/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Student
                        </Link>
                    </Button>
                </div>

                {/* Students Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Students</CardTitle>
                        <CardDescription>
                            Total: {students.total} students in your class
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.data.length > 0 ? (
                                    students.data.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.name}</TableCell>
                                            <TableCell>
                                                {student.school_class ? (
                                                    <div>
                                                        <p className="text-sm font-medium">{student.school_class.name}</p>
                                                        <p className="text-xs text-muted-foreground">{student.school_class.code}</p>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">Not assigned</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            <TableCell>{student.phone}</TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                                    {student.user_name}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={student.status ? "default" : "secondary"}>
                                                    {student.status ? "Active" : "Inactive"}
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
                                                            <Link href={`/teacher/students/${student.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/teacher/students/${student.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            onClick={() => handleDelete(student.id)}
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
                                                No students found. 
                                                <Link href="/teacher/students/create" className="text-primary hover:underline ml-1">
                                                    Add your first student
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
