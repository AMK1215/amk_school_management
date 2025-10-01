import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus, Eye, Edit, Trash2, Users, GraduationCap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Classes',
        href: '/admin/classes',
    },
];

interface SchoolClass {
    id: number;
    name: string;
    code: string;
    grade_level: number;
    section: string | null;
    capacity: number;
    is_active: boolean;
    students_count?: number;
    academic_year?: {
        name: string;
    };
    class_teacher?: {
        name: string;
    };
}

interface ClassesIndexProps {
    classes: {
        data: SchoolClass[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function ClassesIndex({ classes }: ClassesIndexProps) {
    const handleDelete = (classId: number) => {
        if (confirm('Are you sure you want to delete this class?')) {
            router.delete(`/admin/classes/${classId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Classes Management" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Classes Management</h1>
                        <p className="text-muted-foreground">
                            Manage all classes in your school
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/classes/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Class
                        </Link>
                    </Button>
                </div>

                {/* Classes Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Classes</CardTitle>
                        <CardDescription>
                            Total: {classes.total} classes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Grade/Section</TableHead>
                                    <TableHead>Class Teacher</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Academic Year</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classes.data.length > 0 ? (
                                    classes.data.map((schoolClass) => (
                                        <TableRow key={schoolClass.id}>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-2 py-1 rounded font-semibold">
                                                    {schoolClass.code}
                                                </code>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                    {schoolClass.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                Grade {schoolClass.grade_level}
                                                {schoolClass.section && ` - ${schoolClass.section}`}
                                            </TableCell>
                                            <TableCell>
                                                {schoolClass.class_teacher?.name || (
                                                    <span className="text-muted-foreground">Not assigned</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    {schoolClass.students_count || 0}
                                                </div>
                                            </TableCell>
                                            <TableCell>{schoolClass.capacity}</TableCell>
                                            <TableCell>
                                                <span className="text-sm">
                                                    {schoolClass.academic_year?.name || 'N/A'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={schoolClass.is_active ? "default" : "secondary"}>
                                                    {schoolClass.is_active ? "Active" : "Inactive"}
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
                                                            <Link href={`/admin/classes/${schoolClass.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/classes/${schoolClass.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            onClick={() => handleDelete(schoolClass.id)}
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
                                        <TableCell colSpan={9} className="text-center py-8">
                                            <div className="text-muted-foreground">
                                                No classes found. 
                                                <Link href="/admin/classes/create" className="text-primary hover:underline ml-1">
                                                    Create your first class
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

