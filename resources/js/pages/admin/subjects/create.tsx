import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
        title: 'Subjects',
        href: '/admin/subjects',
    },
    {
        title: 'Create Subject',
        href: '/admin/subjects/create',
    },
];

export default function CreateSubject() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
        credit_hours: 1,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/subjects');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Subject" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/subjects">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create New Subject</h1>
                        <p className="text-muted-foreground">
                            Add a new subject to your school curriculum
                        </p>
                    </div>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Subject Information</CardTitle>
                        <CardDescription>
                            Fill in the details for the new subject
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Subject Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter subject name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="code">Subject Code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="MATH101"
                                        required
                                    />
                                    {errors.code && (
                                        <p className="text-sm text-destructive">{errors.code}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="credit_hours">Credit Hours</Label>
                                    <Input
                                        id="credit_hours"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={data.credit_hours}
                                        onChange={(e) => setData('credit_hours', parseInt(e.target.value))}
                                        required
                                    />
                                    {errors.credit_hours && (
                                        <p className="text-sm text-destructive">{errors.credit_hours}</p>
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

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description (Optional)</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Enter subject description"
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">{errors.description}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create Subject'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/admin/subjects">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

