import { type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { BookOpen, Folder, GraduationCap, LayoutGrid, Users, UserCheck, Baby, Shield, Calendar, Book, School, FileText } from 'lucide-react';

// User type constants matching PHP enum
const UserType = {
    Admin: 10,
    Teacher: 20,
    Student: 30,
    Parent: 40,
    Guardian: 50,
} as const;

export function useRoleBasedNavigation(): NavItem[] {
    const { auth } = usePage().props as any;
    const userType = auth?.user?.type;

    const getNavItems = (): NavItem[] => {
        const baseItems: NavItem[] = [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ];

        switch (userType) {
            case UserType.Admin:
                return [
                    ...baseItems,
                    {
                        title: 'Teachers',
                        href: '/admin/teachers',
                        icon: Users,
                    },
                    {
                        title: 'Academic Years',
                        href: '/admin/academic-years',
                        icon: Calendar,
                    },
                    {
                        title: 'Subjects',
                        href: '/admin/subjects',
                        icon: Book,
                    },
                    {
                        title: 'Classes',
                        href: '/admin/classes',
                        icon: School,
                    },
                ];

            case UserType.Teacher:
                return [
                    ...baseItems,
                    {
                        title: 'My Students',
                        href: '/teacher/students',
                        icon: GraduationCap,
                    },
                    {
                        title: 'My Lessons',
                        href: '/teacher/lessons',
                        icon: BookOpen,
                    },
                    {
                        title: 'My Exams',
                        href: '/teacher/exams',
                        icon: FileText,
                    },
                ];

            case UserType.Student:
                return [
                    ...baseItems,
                    {
                        title: 'My Lessons',
                        href: '/student/lessons',
                        icon: BookOpen,
                    },
                    {
                        title: 'My Profile',
                        href: '/student/profile',
                        icon: UserCheck,
                    },
                ];

            case UserType.Parent:
                return [
                    ...baseItems,
                    {
                        title: 'My Children',
                        href: '/parent/children',
                        icon: Baby,
                    },
                ];

            case UserType.Guardian:
                return [
                    ...baseItems,
                    {
                        title: 'My Wards',
                        href: '/guardian/wards',
                        icon: Shield,
                    },
                ];

            default:
                return baseItems;
        }
    };

    return getNavItems();
}

export function getRoleBasedFooterNav(): NavItem[] {
    return [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];
}
