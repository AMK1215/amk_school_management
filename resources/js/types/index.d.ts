import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    user_name?: string;
    phone?: string;
    teacher_id?: number;
    status?: boolean;
    is_changed_password?: boolean;
    type: number;
    referral_code?: string;
    teacher?: User;
    students?: User[];
    students_count?: number;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Teacher extends User {
    students: User[];
    students_count: number;
}

export interface Student extends User {
    teacher: User;
}

export interface DashboardStats {
    total_teachers?: number;
    total_students?: number;
    total_parents?: number;
    total_guardians?: number;
    active_students?: number;
    total_academic_years?: number;
    total_subjects?: number;
    total_classes?: number;
    total_exams?: number;
}

export interface AcademicYear {
    id: number;
    name: string;
    code: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    description?: string;
    created_by: number;
    creator?: User;
    classes?: SchoolClass[];
    exams?: Exam[];
    created_at: string;
    updated_at: string;
}

export interface Subject {
    id: number;
    name: string;
    code: string;
    description?: string;
    credit_hours: number;
    is_active: boolean;
    created_by: number;
    creator?: User;
    teachers?: User[];
    classes?: SchoolClass[];
    exams?: Exam[];
    teachers_count?: number;
    exams_count?: number;
    created_at: string;
    updated_at: string;
}

export interface SchoolClass {
    id: number;
    name: string;
    code: string;
    grade_level: number;
    section?: string;
    capacity: number;
    is_active: boolean;
    academic_year_id: number;
    class_teacher_id?: number;
    created_by: number;
    academic_year?: AcademicYear;
    class_teacher?: User;
    creator?: User;
    students?: User[];
    subjects?: Subject[];
    exams?: Exam[];
    students_count?: number;
    full_name?: string;
    created_at: string;
    updated_at: string;
}

export interface Exam {
    id: number;
    title: string;
    code: string;
    description?: string;
    subject_id: number;
    class_id: number;
    academic_year_id: number;
    exam_date: string;
    duration_minutes: number;
    total_marks: number;
    passing_marks: number;
    type: 'quiz' | 'assignment' | 'midterm' | 'final' | 'project';
    is_published: boolean;
    created_by: number;
    subject?: Subject;
    class?: SchoolClass;
    academic_year?: AcademicYear;
    creator?: User;
    formatted_duration?: string;
    created_at: string;
    updated_at: string;
}
