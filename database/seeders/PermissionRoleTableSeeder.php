<?php

namespace Database\Seeders;

use App\Models\Admin\Permission;
use App\Models\Admin\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PermissionRoleTableSeeder extends Seeder
{
    private const ROLE_PERMISSIONS = [
        'Admin' => [
            // Admin full access
            'admin_access', 'admin_dashboard', 'admin_settings', 'admin_reports',
            
            // Teacher management
            'teacher_index', 'teacher_create', 'teacher_edit', 'teacher_delete', 'teacher_view',
            
            // Student management
            'student_index', 'student_create', 'student_edit', 'student_delete', 'student_view', 'student_assign_teacher',
            
            // Parent management
            'parent_index', 'parent_create', 'parent_edit', 'parent_delete', 'parent_view',
            
            // Guardian management
            'guardian_index', 'guardian_create', 'guardian_edit', 'guardian_delete', 'guardian_view',
            
            // Academic management
            'academic_year_manage', 'class_manage', 'subject_manage', 'schedule_manage', 'exam_manage', 'grade_manage',
            
            // Attendance management
            'attendance_view', 'attendance_mark', 'attendance_edit', 'attendance_report',
            
            // Fee management
            'fee_view', 'fee_collect', 'fee_manage', 'fee_report',
            
            // Communication
            'message_send', 'message_view', 'announcement_manage',
            
            // Reports
            'report_student', 'report_teacher', 'report_academic', 'report_financial',
            
            // Profile
            'profile_view', 'profile_edit', 'password_change',
        ],
        'Teacher' => [
            // Student management (limited)
            'student_index', 'student_view', 'student_assign_teacher',
            
            // Academic management
            'class_manage', 'subject_manage', 'schedule_manage', 'exam_manage', 'grade_manage',
            
            // Attendance management
            'attendance_view', 'attendance_mark', 'attendance_edit', 'attendance_report',
            
            // Communication
            'message_send', 'message_view',
            
            // Reports (limited)
            'report_student', 'report_academic',
            
            // Profile
            'profile_view', 'profile_edit', 'password_change',
        ],
        'Student' => [
            // Limited student access
            'student_view', // Can view own profile
            
            // Academic (view only)
            'class_manage', 'subject_manage', 'schedule_manage', 'exam_manage', 'grade_manage',
            
            // Attendance (view only)
            'attendance_view',
            
            // Communication
            'message_view',
            
            // Profile
            'profile_view', 'profile_edit', 'password_change',
        ],
        'Parent' => [
            // Limited parent access
            'student_view', // Can view their child's info
            
            // Academic (view only)
            'class_manage', 'subject_manage', 'schedule_manage', 'exam_manage', 'grade_manage',
            
            // Attendance (view only)
            'attendance_view',
            
            // Communication
            'message_send', 'message_view',
            
            // Profile
            'profile_view', 'profile_edit', 'password_change',
        ],
        'Guardian' => [
            // Limited guardian access
            'student_view', // Can view their ward's info
            
            // Academic (view only)
            'class_manage', 'subject_manage', 'schedule_manage', 'exam_manage', 'grade_manage',
            
            // Attendance (view only)
            'attendance_view',
            
            // Communication
            'message_send', 'message_view',
            
            // Profile
            'profile_view', 'profile_edit', 'password_change',
        ],
    ];

    private const ROLE_IDS = [
        'Admin' => 1,
        'Teacher' => 2,
        'Student' => 3,
        'Parent' => 4,
        'Guardian' => 5,
    ];

    public function run(): void
    {
        try {
            DB::beginTransaction();

            // Validate roles exist
            $this->validateRoles();

            // Validate permissions exist
            $this->validatePermissions();

            // Clean up existing permission assignments
            $this->cleanupExistingAssignments();

            // Assign permissions to roles
            foreach (self::ROLE_PERMISSIONS as $roleName => $permissions) {
                $roleId = self::ROLE_IDS[$roleName];
                $permissionIds = Permission::whereIn('title', $permissions)
                    ->pluck('id')
                    ->toArray();

                $this->assignPermissions($roleId, $permissionIds, $roleName);
            }

            // Verify permission assignments
            $this->verifyPermissionAssignments();

            DB::commit();
            Log::info('Permission assignments completed successfully');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in PermissionRoleTableSeeder: '.$e->getMessage());
            throw $e;
        }
    }

    private function validateRoles(): void
    {
        $existingRoles = Role::whereIn('id', array_values(self::ROLE_IDS))->pluck('id')->toArray();
        $missingRoles = array_diff(array_values(self::ROLE_IDS), $existingRoles);

        if (! empty($missingRoles)) {
            throw new \RuntimeException('Missing required roles with IDs: '.implode(', ', $missingRoles));
        }
    }

    private function validatePermissions(): void
    {
        $allPermissions = array_merge(...array_values(self::ROLE_PERMISSIONS));
        $existingPermissions = Permission::whereIn('title', $allPermissions)->pluck('title')->toArray();
        $missingPermissions = array_diff($allPermissions, $existingPermissions);

        if (! empty($missingPermissions)) {
            throw new \RuntimeException('Missing required permissions: '.implode(', ', $missingPermissions));
        }
    }

    private function cleanupExistingAssignments(): void
    {
        try {
            DB::table('permission_role')->truncate();
            Log::info('Cleaned up existing permission assignments');
        } catch (\Exception $e) {
            Log::error('Failed to cleanup existing permission assignments: '.$e->getMessage());
            throw $e;
        }
    }

    private function assignPermissions(int $roleId, array $permissions, string $roleName): void
    {
        try {
            $role = Role::findOrFail($roleId);
            $role->permissions()->sync($permissions);
            Log::info('Assigned '.count($permissions)." permissions to {$roleName} role");
        } catch (\Exception $e) {
            Log::error("Failed to assign permissions to {$roleName} role: ".$e->getMessage());
            throw $e;
        }
    }

    private function verifyPermissionAssignments(): void
    {
        foreach (self::ROLE_PERMISSIONS as $roleName => $expectedPermissions) {
            $roleId = self::ROLE_IDS[$roleName];
            $role = Role::findOrFail($roleId);
            $assignedPermissions = $role->permissions()->pluck('title')->toArray();
            $missingPermissions = array_diff($expectedPermissions, $assignedPermissions);

            if (! empty($missingPermissions)) {
                throw new \RuntimeException(
                    "Role '{$roleName}' is missing permissions: ".implode(', ', $missingPermissions)
                );
            }
        }
    }
}
