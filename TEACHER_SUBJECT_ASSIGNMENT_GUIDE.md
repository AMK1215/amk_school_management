# 📚 Teacher Subject Assignment Guide

## Overview
Admin can now assign subjects to teachers for specific academic years.

---

## 🎯 How to Assign Subjects to Teachers

### **Method 1: From Teacher Details Page**

1. **Login as Admin** (Phone: 09123456789)
2. **Navigate to Teachers** → Select a teacher → Click on their name
3. **Click "Assign Subjects"** button
4. **Select Academic Year** from the dropdown
5. **Check the subjects** you want to assign to the teacher
6. **Click "Assign Subjects"**

### **Method 2: Direct URL**
- Go to: `/admin/teachers/{teacher_id}/assign-subjects`

---

## 📋 What You Can Do

### **Assign Multiple Subjects**
- Teachers can teach multiple subjects
- Select as many subjects as needed using checkboxes

### **Different Subjects Per Academic Year**
- Assign different subjects for different academic years
- Example:
  - **2024-2025**: Mathematics, Physics
  - **2025-2026**: Mathematics, Chemistry

### **Update Assignments**
- Change subject assignments anytime
- Selecting a different academic year shows subjects for that year
- Updating will replace old assignments for that academic year

---

## 🔄 Assignment Flow

```
Admin → Teachers → Select Teacher → Assign Subjects
  ↓
Select Academic Year
  ↓
Check Subject Checkboxes
  ↓
Click "Assign Subjects"
  ↓
Redirected to Teacher Details Page
  ↓
View Assigned Subjects in "Assigned Subjects" Card
```

---

## 📊 View Assigned Subjects

### **Teacher Details Page Shows:**
1. **Assigned Subjects Card** - Lists all subjects assigned to the teacher
2. **Subject Code and Name** - Clear identification
3. **Count** - Number of subjects assigned

---

## 🎓 Use Cases

### **Example 1: Math Teacher**
- Teacher: John Smith
- Academic Year: 2024-2025
- Assigned Subjects:
  - MATH101 - Basic Mathematics
  - MATH201 - Advanced Mathematics

### **Example 2: Science Teacher**
- Teacher: Jane Doe
- Academic Year: 2024-2025
- Assigned Subjects:
  - SCI101 - Physics
  - SCI102 - Chemistry
  - SCI103 - Biology

### **Example 3: Multi-Year Teaching**
- Teacher: Robert Brown
- **Academic Year 2024-2025:**
  - ENG101 - English Literature
  - ENG102 - Grammar
- **Academic Year 2025-2026:**
  - ENG201 - Advanced Literature

---

## ⚙️ Technical Details

### **Database Structure:**
- **Table**: `teacher_subject` (pivot table)
- **Columns**:
  - `teacher_id` → Links to users table
  - `subject_id` → Links to subjects table
  - `academic_year_id` → Links to academic_years table

### **Relationships:**
- **Many-to-Many** relationship between Teachers and Subjects
- Scoped by Academic Year (a teacher can teach different subjects each year)

---

## 🚀 Future Enhancements

Planned features:
1. **Class-Specific Assignment** - Assign teachers to teach specific subjects in specific classes
2. **Schedule Management** - Set teaching schedules for each subject
3. **Performance Tracking** - Track teacher performance per subject
4. **Bulk Assignment** - Assign multiple teachers to subjects at once
5. **Academic Year Duplication** - Copy assignments from previous year

---

## 📝 Notes

- Teachers must be active to be assigned subjects
- Subjects must be active to be assignable
- Academic years must be active to select
- Assignments are saved per academic year
- Can reassign subjects anytime without losing history

---

## ✅ Quick Checklist

Before assigning subjects, ensure:
- [ ] Teacher exists and is active
- [ ] Subjects exist and are active
- [ ] Academic year exists and is active
- [ ] You're logged in as Admin

---

**For questions or issues, refer to the main SCHOOL_SYSTEM_GUIDE.md**

