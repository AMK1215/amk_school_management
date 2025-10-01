import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Clock,
    GraduationCap,
    ArrowLeft,
    UserPlus,
    LogIn,
    MessageSquare,
    CheckCircle
} from 'lucide-react';

interface ContactProps {
    message?: string;
}

export default function Contact({ message }: ContactProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Contact Us - School Management System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Navigation */}
                <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
                    <div className="container mx-auto px-4 py-3 sm:py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-base font-bold sm:text-lg md:text-xl">School Management</h1>
                                    <p className="hidden text-xs text-muted-foreground sm:block">Education Made Simple</p>
                                </div>
                            </div>
                            <div className="flex gap-2 sm:gap-3">
                                <Button variant="outline" size="sm" asChild className="sm:size-default">
                                    <Link href="/">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">Back to</span> Home
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
                    <div className="mx-auto max-w-4xl">
                        {/* Header */}
                        <div className="mb-8 text-center sm:mb-12">
                            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Contact Us</h1>
                            <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
                                Get in touch with our school administration
                            </p>
                        </div>

                        {/* Message Alert */}
                        {message && (
                            <Card className="mb-8 border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        <p className="text-sm sm:text-base">{message}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
                            {/* Contact Information */}
                            <Card className="border-2">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl">Get in Touch</CardTitle>
                                    <CardDescription>
                                        Contact our administration for enrollment or inquiries
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Email</p>
                                            <a href="mailto:aungmyokhaing1215@gmail.com" className="block text-sm text-muted-foreground hover:text-primary hover:underline">
                                                aungmyokhaing1215@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                            <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Phone</p>
                                            <a href="tel:09257031942" className="block text-sm text-muted-foreground hover:text-primary hover:underline">
                                                09257031942
                                            </a>
                                            <a href="tel:09683412548" className="block text-sm text-muted-foreground hover:text-primary hover:underline">
                                                09683412548
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                            <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Messaging Apps</p>
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium">Viber:</span> 09257031942
                                            </p>
                                            <a href="https://t.me/aiworld2048" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary hover:underline">
                                                <span className="font-medium">Telegram:</span> @aiworld2048
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                            <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Contact Person</p>
                                            <p className="text-sm font-medium">TR - AungMyoKhaing</p>
                                            <p className="text-xs text-muted-foreground mt-1">School Administrator</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="border-2">
                                <CardHeader>
                                    <CardTitle className="text-xl sm:text-2xl">Quick Actions</CardTitle>
                                    <CardDescription>
                                        Join our school community today
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {!auth.user ? (
                                        <>
                                            <div className="space-y-3">
                                                <h3 className="font-semibold">Already have an account?</h3>
                                                <Button asChild className="w-full gap-2" size="lg">
                                                    <Link href={login()}>
                                                        <LogIn className="h-4 w-4" />
                                                        Sign In
                                                    </Link>
                                                </Button>
                                                <p className="text-xs text-muted-foreground">
                                                    Access lessons, assignments, and more
                                                </p>
                                            </div>

                                            <div className="mt-8 rounded-lg bg-blue-50 border border-blue-200 p-4 dark:bg-blue-950 dark:border-blue-800">
                                                <h4 className="mb-2 font-semibold flex items-center gap-2">
                                                    <UserPlus className="h-4 w-4" />
                                                    New to Our School?
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Accounts are created by our administration team. 
                                                    Contact us via phone, email, or messaging apps to:
                                                </p>
                                                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle className="h-3 w-3 text-blue-600" />
                                                        Request account creation
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle className="h-3 w-3 text-blue-600" />
                                                        Get enrollment information
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle className="h-3 w-3 text-blue-600" />
                                                        Schedule a visit
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="mt-6 rounded-lg bg-muted p-4">
                                                <h4 className="mb-2 font-semibold">How It Works</h4>
                                                <ol className="space-y-2 text-sm text-muted-foreground">
                                                    <li className="flex gap-2">
                                                        <span className="font-semibold">1.</span>
                                                        <span>Contact us using the information on the left</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="font-semibold">2.</span>
                                                        <span>Our admin will create your account</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="font-semibold">3.</span>
                                                        <span>Receive your login credentials</span>
                                                    </li>
                                                    <li className="flex gap-2">
                                                        <span className="font-semibold">4.</span>
                                                        <span>Start using the system!</span>
                                                    </li>
                                                </ol>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-3">
                                            <h3 className="font-semibold">Welcome back!</h3>
                                            <Button asChild className="w-full gap-2" size="lg">
                                                <Link href={dashboard()}>
                                                    Go to Dashboard
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

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

