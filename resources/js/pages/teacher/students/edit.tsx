import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Student } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface SchoolClass {
    id: number;
    name: string;
    code: string;
    grade_level: number;
    section: string | null;
}

interface EditStudentProps {
    student: Student & { class_id?: number };
    classes: SchoolClass[];
}

export default function EditStudent({ student, classes }: EditStudentProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Teacher Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Students',
            href: '/teacher/students',
        },
        {
            title: `Edit ${student.name}`,
            href: `/teacher/students/${student.id}/edit`,
        },
    ];

    const { data, setData, patch, processing, errors } = useForm({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        class_id: student.class_id || '',
        status: student.status ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/teacher/students/${student.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${student.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/teacher/students">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Student</h1>
                        <p className="text-muted-foreground">
                            Update student information
                        </p>
                    </div>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                        <CardDescription>
                            Update the student's details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="class_id">Class *</Label>
                                    <Select 
                                        value={data.class_id.toString()} 
                                        onValueChange={(value) => setData('class_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select class" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes.map((schoolClass) => (
                                                <SelectItem key={schoolClass.id} value={schoolClass.id.toString()}>
                                                    {schoolClass.name} ({schoolClass.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.class_id && (
                                        <p className="text-sm text-destructive">{errors.class_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter student's full name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="student@school.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+1234567890"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-destructive">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="status"
                                            checked={data.status}
                                            onCheckedChange={(checked) => setData('status', checked)}
                                        />
                                        <Label htmlFor="status" className="text-sm">
                                            {data.status ? 'Active' : 'Inactive'}
                                        </Label>
                                    </div>
                                    {errors.status && (
                                        <p className="text-sm text-destructive">{errors.status}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Student'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/teacher/students">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
