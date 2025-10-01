import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    GraduationCap, 
    Users, 
    BookOpen, 
    School, 
    CheckCircle, 
    ArrowRight,
    Calendar,
    BarChart,
    Shield,
    Sparkles
} from 'lucide-react';

interface FeaturedLesson {
    subject_name: string;
    subject_code: string;
    class_name: string;
    lessons: Array<{
        title: string;
        description: string | null;
        teacher_name: string;
    }>;
    total_count: number;
}

interface WelcomeProps {
    featuredLessons: FeaturedLesson[];
}

export default function Welcome({ featuredLessons = [] }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to School Management System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Navigation */}
                <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                    <div className="container mx-auto px-4 py-3 sm:py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-lg sm:text-xl font-bold">School Management</h1>
                                    <p className="text-xs text-muted-foreground">Education Made Simple</p>
                                </div>
                                <h1 className="text-base font-bold sm:hidden">School MS</h1>
                            </div>
                            <div className="flex gap-2 sm:gap-3">
                                {auth.user ? (
                                    <Button asChild size="sm" className="sm:size-default">
                                        <Link href={dashboard()}>
                                            <ArrowRight className="mr-2 h-4 w-4" />
                                            <span className="hidden sm:inline">Go to</span> Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button asChild size="sm" className="sm:size-default">
                                            <Link href={login()}>Log in</Link>
                                        </Button>
                                        <Button variant="outline" asChild size="sm" className="sm:size-default">
                                            <Link href="/contact">Contact Us</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32">
                    <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                <Sparkles className="h-4 w-4" />
                                Modern Education Platform
                            </div>
                            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                                Complete School
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Management </span>
                                System
                            </h1>
                            <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
                                Streamline your school operations with our comprehensive platform. 
                                Manage teachers, students, classes, lessons, and exams all in one place.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                {!auth.user && (
                                    <>
                                        <Button size="lg" asChild className="gap-2 w-full sm:w-auto">
                                            <Link href={login()}>
                                                Sign In to Access
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                                            <Link href="/contact">Contact Administrator</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {/* Hero Stats */}
                        <div className="relative">
                            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Card className="border-2 shadow-lg transition-all hover:shadow-xl">
                                    <CardContent className="p-6">
                                        <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                                        <p className="mt-4 text-3xl font-bold">1,250+</p>
                                        <p className="text-sm text-muted-foreground">Students</p>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border-2 shadow-lg transition-all hover:shadow-xl">
                                    <CardContent className="p-6">
                                        <Users className="h-10 w-10 text-green-600 dark:text-green-400" />
                                        <p className="mt-4 text-3xl font-bold">150+</p>
                                        <p className="text-sm text-muted-foreground">Teachers</p>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border-2 shadow-lg transition-all hover:shadow-xl">
                                    <CardContent className="p-6">
                                        <BookOpen className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                                        <p className="mt-4 text-3xl font-bold">500+</p>
                                        <p className="text-sm text-muted-foreground">Lessons</p>
                                    </CardContent>
                                </Card>
                                
                                <Card className="border-2 shadow-lg transition-all hover:shadow-xl">
                                    <CardContent className="p-6">
                                        <School className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                                        <p className="mt-4 text-3xl font-bold">25+</p>
                                        <p className="text-sm text-muted-foreground">Classes</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Lessons Section */}
                {featuredLessons.length > 0 && (
                    <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
                        <div className="mb-8 text-center sm:mb-12">
                            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Featured Lessons</h2>
                            <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
                                Explore our rich curriculum across different subjects
                            </p>
                        </div>

                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featuredLessons.map((item, index) => (
                                <Card key={index} className="border-2 transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                    {item.subject_name}
                                                </CardTitle>
                                                <CardDescription className="mt-1">
                                                    <span className="inline-flex items-center gap-1">
                                                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-semibold">
                                                            {item.subject_code}
                                                        </code>
                                                        <span className="text-xs">•</span>
                                                        <span className="text-xs">{item.class_name}</span>
                                                    </span>
                                                </CardDescription>
                                            </div>
                                            <Badge variant="secondary" className="text-xs">
                                                {item.total_count} {item.total_count === 1 ? 'lesson' : 'lessons'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {item.lessons.map((lesson, lessonIndex) => (
                                            <div key={lessonIndex} className="rounded-lg border bg-muted/50 p-3 transition-all hover:bg-muted">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-semibold">{lesson.title}</h4>
                                                        {lesson.description && (
                                                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                                {lesson.description}
                                                            </p>
                                                        )}
                                                        <p className="mt-2 text-xs text-muted-foreground">
                                                            By {lesson.teacher_name}
                                                        </p>
                                                    </div>
                                                    <Button 
                                                        asChild 
                                                        variant="ghost" 
                                                        size="sm"
                                                        className="mt-0.5 h-auto px-2 py-1 text-xs"
                                                    >
                                                        <Link href="/contact">
                                                            View
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {item.total_count > 3 && (
                                            <p className="text-center text-xs text-muted-foreground">
                                                +{item.total_count - 3} more lessons
                                            </p>
                                        )}
                                        <Button asChild variant="outline" className="w-full mt-2" size="sm">
                                            <Link href="/contact">
                                                View All {item.subject_name} Lessons
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {featuredLessons.length === 0 && (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                                    <p className="mt-4 text-muted-foreground">
                                        No lessons published yet. Check back soon!
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </section>
                )}

                {/* Features Section */}
                <section className="bg-white py-12 sm:py-16 md:py-20 dark:bg-gray-800/50">
                    <div className="container mx-auto px-4">
                        <div className="mb-8 text-center sm:mb-12">
                            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Powerful Features</h2>
                            <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
                                Everything you need to run a modern school
                            </p>
                        </div>

                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="border-2 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle>User Management</CardTitle>
                                    <CardDescription>
                                        Comprehensive role-based system for all school members
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Phone-based authentication
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Hierarchical structure
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Status management
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-2 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                        <School className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <CardTitle>Class Management</CardTitle>
                                    <CardDescription>
                                        Organize classes, subjects, and teacher assignments
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Grade-based organization
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Subject assignments
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Capacity tracking
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-2 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                        <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <CardTitle>Lesson System</CardTitle>
                                    <CardDescription>
                                        Create, manage, and publish lessons for students
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Rich content editor
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Draft & publish
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Schedule lessons
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-2 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                        <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <CardTitle>Academic Years</CardTitle>
                                    <CardDescription>
                                        Manage academic years and curriculum tracking
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Year-based structure
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Active year tracking
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Historical data
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-2 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                                        <BarChart className="h-6 w-6 text-red-600 dark:text-red-400" />
                                    </div>
                                    <CardTitle>Exam Management</CardTitle>
                                    <CardDescription>
                                        Create and manage exams with tracking
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Exam scheduling
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Marks management
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Result tracking
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-2 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                        <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <CardTitle>Secure & Reliable</CardTitle>
                                    <CardDescription>
                                        Built with security and data protection
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Role-based access
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Data validation
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            Encrypted passwords
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* User Roles Section */}
                <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
                    <div className="mb-8 text-center sm:mb-12">
                        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Made for Everyone</h2>
                        <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
                            Different interfaces tailored for each role
                        </p>
                    </div>

                    <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        <Card className="text-center transition-all hover:scale-105">
                            <CardContent className="p-4 sm:pt-6">
                                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500">
                                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h3 className="mt-3 text-sm font-bold sm:mt-4 sm:text-base">Admin</h3>
                                <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                                    Full system control
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center transition-all hover:scale-105">
                            <CardContent className="p-4 sm:pt-6">
                                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h3 className="mt-3 text-sm font-bold sm:mt-4 sm:text-base">Teacher</h3>
                                <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                                    Manage & teach
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center transition-all hover:scale-105">
                            <CardContent className="p-4 sm:pt-6">
                                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                                    <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h3 className="mt-3 text-sm font-bold sm:mt-4 sm:text-base">Student</h3>
                                <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                                    Learn & grow
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center transition-all hover:scale-105">
                            <CardContent className="p-4 sm:pt-6">
                                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h3 className="mt-3 text-sm font-bold sm:mt-4 sm:text-base">Parent</h3>
                                <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                                    Monitor progress
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center transition-all hover:scale-105">
                            <CardContent className="p-4 sm:pt-6">
                                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500">
                                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                </div>
                                <h3 className="mt-3 text-sm font-bold sm:mt-4 sm:text-base">Guardian</h3>
                                <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                                    Support learning
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                {!auth.user && (
                    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 sm:py-16 md:py-20 text-white">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Want to Join Our School?</h2>
                            <p className="mt-3 text-base opacity-90 sm:mt-4 sm:text-lg">
                                Contact our administration for enrollment and account setup
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                                <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                                    <Link href="/contact">
                                        Contact Administration
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="w-full border-white bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                                    <Link href={login()}>Sign In</Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t bg-white py-6 sm:py-8 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col items-center justify-between gap-3 text-center sm:gap-4 md:flex-row md:text-left">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                <span className="text-sm font-semibold sm:text-base">School Management System</span>
                            </div>
                            <p className="text-xs text-muted-foreground sm:text-sm">
                                © {new Date().getFullYear()} All rights reserved. Built with Laravel & React
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

