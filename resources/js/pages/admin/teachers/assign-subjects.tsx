import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, BookOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Teachers',
        href: '/admin/teachers',
    },
    {
        title: 'Assign Subjects',
        href: '#',
    },
];

interface Teacher {
    id: number;
    name: string;
    email: string;
    subjects: Array<{
        id: number;
        name: string;
        pivot: {
            academic_year_id: number;
        };
    }>;
}

interface Subject {
    id: number;
    name: string;
    code: string;
}

interface AcademicYear {
    id: number;
    name: string;
}

interface AssignSubjectsProps {
    teacher: Teacher;
    subjects: Subject[];
    academicYears: AcademicYear[];
}

export default function AssignSubjects({ teacher, subjects, academicYears }: AssignSubjectsProps) {
    const { data, setData, post, processing, errors } = useForm({
        academic_year_id: academicYears[0]?.id || '',
        subjects: [] as number[],
    });

    // Get already assigned subject IDs for the selected academic year
    const assignedSubjects = teacher.subjects
        .filter(s => s.pivot.academic_year_id === data.academic_year_id)
        .map(s => s.id);

    // Initialize subjects when academic year changes
    const handleAcademicYearChange = (value: string) => {
        const yearId = parseInt(value);
        setData('academic_year_id', yearId);
        
        // Set already assigned subjects for this academic year
        const assigned = teacher.subjects
            .filter(s => s.pivot.academic_year_id === yearId)
            .map(s => s.id);
        setData('subjects', assigned);
    };

    const toggleSubject = (subjectId: number) => {
        if (data.subjects.includes(subjectId)) {
            setData('subjects', data.subjects.filter(id => id !== subjectId));
        } else {
            setData('subjects', [...data.subjects, subjectId]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/teachers/${teacher.id}/assign-subjects`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign Subjects - ${teacher.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/teachers/${teacher.id}`}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assign Subjects</h1>
                        <p className="text-muted-foreground">
                            Assign subjects to {teacher.name}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle>Subject Assignment</CardTitle>
                        <CardDescription>
                            Select an academic year and the subjects this teacher will teach
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Academic Year Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="academic_year_id">Academic Year</Label>
                                <Select 
                                    value={data.academic_year_id.toString()} 
                                    onValueChange={handleAcademicYearChange}
                                >
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

                            {/* Subjects Selection */}
                            <div className="space-y-3">
                                <Label>Subjects</Label>
                                <p className="text-sm text-muted-foreground">
                                    Select the subjects this teacher will teach in {academicYears.find(y => y.id === data.academic_year_id)?.name}
                                </p>
                                
                                {subjects.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border rounded-lg">
                                        {subjects.map((subject) => (
                                            <div key={subject.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                                                <Checkbox
                                                    id={`subject-${subject.id}`}
                                                    checked={data.subjects.includes(subject.id)}
                                                    onCheckedChange={() => toggleSubject(subject.id)}
                                                />
                                                <label
                                                    htmlFor={`subject-${subject.id}`}
                                                    className="flex items-center gap-2 cursor-pointer flex-1"
                                                >
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium leading-none">
                                                            {subject.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {subject.code}
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No active subjects available</p>
                                )}
                                
                                {errors.subjects && (
                                    <p className="text-sm text-destructive">{errors.subjects}</p>
                                )}
                            </div>

                            {/* Selected Count */}
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <p className="text-sm">
                                    <span className="font-semibold">{data.subjects.length}</span> subject(s) selected
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing || data.subjects.length === 0}>
                                    {processing ? 'Assigning...' : 'Assign Subjects'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={`/admin/teachers/${teacher.id}`}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

