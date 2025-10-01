# 🏫 School Management System - User Guide

## 🚀 Getting Started

### Running the Application
```bash
composer dev
```
This will start the Laravel server, queue worker, and Vite development server.

### Default Login Credentials
After seeding, you can login with these accounts using **PHONE NUMBER**:

**Admin Account:**
- Phone: 09123456789
- Password: password123

**Teacher Accounts:**
- Phone: 09112345601, 09112345602, 09112345603, 09112345604, 09112345605
- Password: password123

**Student Accounts:**
- Phone: 09111111101, 09111111102, 09111111103, etc.
- Password: password123

**Parent Accounts:**
- Phone: 09222222201, 09222222202, etc.
- Password: password123

**Guardian Accounts:**
- Phone: 09333333301, 09333333302, etc.
- Password: password123

**📱 Note: Login uses PHONE NUMBERS, not email addresses!**

## 👥 User Roles & Permissions

### 🔐 Admin (Type: 10)
**Access:** Full system control
**Capabilities:**
- View admin dashboard with system statistics
- Create, edit, delete teachers
- View all teachers and their student counts
- Access to `/admin/*` routes

**Dashboard Features:**
- Total counts: Teachers, Students, Parents, Guardians
- Recent teachers list
- Quick actions for teacher management

### 👨‍🏫 Teacher (Type: 20)
**Access:** Student management within their classroom
**Capabilities:**
- View teacher dashboard with class statistics
- Create, edit, delete students in their class
- View student profiles and information
- Access to `/teacher/*` routes

**Dashboard Features:**
- Total and active student counts
- Recent students list
- Quick actions for student management

### 🎓 Student (Type: 30)
**Access:** Read-only access to their own information
**Capabilities:**
- View personal dashboard
- View their profile information
- See assigned teacher details
- Access to `/student/*` routes

**Dashboard Features:**
- Personal information display
- Teacher contact information
- Academic overview (placeholder for future features)

### 👨‍👩‍👧‍👦 Parent (Type: 40)
**Access:** View-only access to children's information (when implemented)
**Capabilities:**
- View parent dashboard
- Access children information (future feature)
- Access to `/parent/*` routes

**Note:** Parents can register themselves - no admin creation needed

### 🛡️ Guardian (Type: 50)
**Access:** View-only access to ward's information (when implemented)
**Capabilities:**
- View guardian dashboard
- Access ward information (future feature)
- Access to `/guardian/*` routes

**Note:** Guardians can register themselves - no admin creation needed

## 🔄 User Hierarchy & Workflow

```
Admin → Creates Teachers
Teacher → Creates Students
Parent/Guardian → Self-register (independent)
```

### Admin Workflow:
1. Login to admin dashboard
2. Navigate to "Teachers" section
3. Click "Add Teacher" to create new teachers
4. Manage existing teachers (view, edit, delete)

### Teacher Workflow:
1. Login to teacher dashboard
2. Navigate to "My Students" section
3. Click "Add Student" to create new students
4. Manage existing students (view, edit, delete)

### Student Workflow:
1. Login to student dashboard
2. View personal information
3. See teacher contact details
4. Access academic information (when available)

## 🎨 UI Features

### Responsive Design
- Mobile-first responsive layout
- Collapsible sidebar navigation
- Modern card-based interface

### Theme Support
- Light/dark mode toggle
- Consistent styling across all dashboards

### Navigation
- Role-based navigation menus
- Breadcrumb navigation
- Quick action buttons

## 🗄️ Database Structure

### User Types (Enum Values):
- Admin: 10
- Teacher: 20
- Student: 30
- Parent: 40
- Guardian: 50

### Key Relationships:
- Teachers belong to Admin (via teacher_id)
- Students belong to Teacher (via teacher_id)
- Users have wallets (financial system)
- Role-based permissions system

## 📱 Phone-Based Authentication

### Login System:
- **Primary Identifier**: Phone numbers (not email)
- **Unique Constraint**: Each phone number must be unique
- **Format**: Supports international format (+1234567890)
- **Validation**: Phone number format validation on registration

### Authentication Flow:
1. User enters phone number and password
2. System validates phone number exists and account is active
3. Password verification against hashed password
4. Role-based dashboard redirect

### Password Reset:
- **Current**: Contact administrator for password reset
- **Future**: SMS-based password reset (can be implemented)

## 🔧 Technical Details

### Backend:
- Laravel 12 with PHP 8.2+
- SQLite database (development)
- Phone-based authentication system
- Bavix Wallet for financial features
- Role-based middleware protection

### Frontend:
- React 18 with TypeScript
- Inertia.js for SPA experience
- Tailwind CSS styling
- Radix UI components

### Security:
- Phone-based authentication
- Account status validation
- Route protection via middleware
- Role-based access control
- Input validation and sanitization

## 🚧 Future Enhancements

### Planned Features:
1. **Academic Management:**
   - Grades and assignments
   - Attendance tracking
   - Report cards

2. **Parent-Child Relationships:**
   - Link parents to students
   - Guardian-ward relationships
   - Family communication

3. **Financial Features:**
   - School fee management
   - Payment tracking
   - Financial reports

4. **Communication:**
   - Messaging between roles
   - Notifications
   - Announcements

5. **Advanced Features:**
   - Class scheduling
   - Exam management
   - Library system

## 📞 Support

For technical support or feature requests, contact the development team.

---

**Note:** This system is designed to be scalable and can be extended with additional features as needed.
