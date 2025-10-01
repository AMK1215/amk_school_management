import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Teacher } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus, Eye, Edit, Trash2, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Teachers',
        href: '/admin/teachers',
    },
];

interface TeachersIndexProps {
    teachers: {
        data: Teacher[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function TeachersIndex({ teachers }: TeachersIndexProps) {
    const handleDelete = (teacherId: number) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            router.delete(`/admin/teachers/${teacherId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers Management" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
                        <p className="text-muted-foreground">
                            Manage all teachers in your school system
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/teachers/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Teacher
                        </Link>
                    </Button>
                </div>

                {/* Teachers Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Teachers</CardTitle>
                        <CardDescription>
                            Total: {teachers.total} teachers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teachers.data.length > 0 ? (
                                    teachers.data.map((teacher) => (
                                        <TableRow key={teacher.id}>
                                            <TableCell className="font-medium">{teacher.name}</TableCell>
                                            <TableCell>{teacher.email}</TableCell>
                                            <TableCell>{teacher.phone}</TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                                    {teacher.user_name}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    {teacher.students_count || 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={teacher.status ? "default" : "secondary"}>
                                                    {teacher.status ? "Active" : "Inactive"}
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
                                                            <Link href={`/admin/teachers/${teacher.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/teachers/${teacher.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            onClick={() => handleDelete(teacher.id)}
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
                                                No teachers found. 
                                                <Link href="/admin/teachers/create" className="text-primary hover:underline ml-1">
                                                    Create your first teacher
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
