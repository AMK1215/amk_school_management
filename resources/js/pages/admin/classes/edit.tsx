import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Classes',
        href: '/admin/classes',
    },
    {
        title: 'Edit Class',
        href: '#',
    },
];

interface SchoolClass {
    id: number;
    name: string;
    code: string;
    grade_level: number;
    section: string | null;
    capacity: number;
    academic_year_id: number;
    class_teacher_id: number | null;
    is_active: boolean;
    subjects: Array<{ id: number }>;
}

interface AcademicYear {
    id: number;
    name: string;
}

interface Teacher {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface EditClassProps {
    class: SchoolClass;
    academicYears: AcademicYear[];
    teachers: Teacher[];
    subjects: Subject[];
}

export default function EditClass({ class: schoolClass, academicYears, teachers, subjects }: EditClassProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: schoolClass.name,
        code: schoolClass.code,
        grade_level: schoolClass.grade_level,
        section: schoolClass.section || '',
        capacity: schoolClass.capacity,
        academic_year_id: schoolClass.academic_year_id,
        class_teacher_id: schoolClass.class_teacher_id || '',
        subjects: schoolClass.subjects.map(s => s.id),
        is_active: schoolClass.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/classes/${schoolClass.id}`);
    };

    const toggleSubject = (subjectId: number) => {
        if (data.subjects.includes(subjectId)) {
            setData('subjects', data.subjects.filter(id => id !== subjectId));
        } else {
            setData('subjects', [...data.subjects, subjectId]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${schoolClass.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/classes">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Class</h1>
                        <p className="text-muted-foreground">
                            Update class information
                        </p>
                    </div>
                </div>

                {/* Form */}
                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle>Class Information</CardTitle>
                        <CardDescription>
                            Update the details for {schoolClass.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Class Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter class name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code">Class Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="CLASS-1A"
                                        required
                                    />
                                    {errors.code && (
                                        <p className="text-sm text-destructive">{errors.code}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="grade_level">Grade Level</Label>
                                    <Input
                                        id="grade_level"
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={data.grade_level}
                                        onChange={(e) => setData('grade_level', parseInt(e.target.value))}
                                        required
                                    />
                                    {errors.grade_level && (
                                        <p className="text-sm text-destructive">{errors.grade_level}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="section">Section (Optional)</Label>
                                    <Input
                                        id="section"
                                        type="text"
                                        value={data.section}
                                        onChange={(e) => setData('section', e.target.value)}
                                        placeholder="A, B, C..."
                                    />
                                    {errors.section && (
                                        <p className="text-sm text-destructive">{errors.section}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Student Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', parseInt(e.target.value))}
                                        required
                                    />
                                    {errors.capacity && (
                                        <p className="text-sm text-destructive">{errors.capacity}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="academic_year_id">Academic Year</Label>
                                    <Select value={data.academic_year_id.toString()} onValueChange={(value) => setData('academic_year_id', parseInt(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select academic year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {academicYears.map((year) => (
                                                <SelectItem key={year.id} value={year.id.toString()}>
                                                    {year.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.academic_year_id && (
                                        <p className="text-sm text-destructive">{errors.academic_year_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="class_teacher_id">Class Teacher (Optional)</Label>
                                    <Select value={data.class_teacher_id.toString()} onValueChange={(value) => setData('class_teacher_id', value === '' ? '' : parseInt(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select class teacher" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">None</SelectItem>
                                            {teachers.map((teacher) => (
                                                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                    {teacher.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.class_teacher_id && (
                                        <p className="text-sm text-destructive">{errors.class_teacher_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="is_active">Status</Label>
                                    <div className="flex items-center space-x-2 pt-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active" className="cursor-pointer">
                                            {data.is_active ? 'Active' : 'Inactive'}
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {/* Subjects Selection */}
                            <div className="space-y-3">
                                <Label>Subjects (Optional)</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg">
                                    {subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`subject-${subject.id}`}
                                                checked={data.subjects.includes(subject.id)}
                                                onCheckedChange={() => toggleSubject(subject.id)}
                                            />
                                            <label
                                                htmlFor={`subject-${subject.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                            >
                                                {subject.code} - {subject.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.subjects && (
                                    <p className="text-sm text-destructive">{errors.subjects}</p>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Class'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/classes">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

