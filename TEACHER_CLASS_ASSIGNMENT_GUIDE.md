# 🎓 Teacher Class Assignment Guide

## Overview
Admin can assign teachers to teach specific subjects in multiple classes.

---

## 📊 Complete Assignment Flow

### **Step 1: Assign Subjects to Teacher**
First, assign which subjects the teacher can teach overall.

**Path:** Teachers → Select Teacher → "Assign Subjects"

**Example:**
- Teacher: John Smith
- Assigned Subjects:
  - MATH101 - Mathematics
  - PHY101 - Physics
  - CHEM101 - Chemistry

---

### **Step 2: Assign Classes to Teacher**
Then, assign which classes they'll teach those subjects in.

**Path:** Teachers → Select Teacher → "Assign Classes"

**Example:**
- **Class 1A:**
  - ☑️ Mathematics
  - ☑️ Physics
- **Class 1B:**
  - ☑️ Mathematics
- **Class 2A:**
  - ☑️ Chemistry

**Result:** Teacher teaches Math & Physics in Class 1A, Math in Class 1B, Chemistry in Class 2A

---

## 🎯 How to Assign Classes

### **Method: From Teacher Details Page**

1. **Login as Admin**
2. **Go to Teachers** → Select a teacher
3. **Ensure teacher has subjects assigned**
   - If not, click "Assign Subjects" first
4. **Click "Assign Classes"** button
5. **For each class, check the subjects** the teacher will teach
6. **Click "Assign Classes"**

---

## 📋 System Logic

### **Smart Filtering:**
The system only shows:
- ✅ Subjects the teacher CAN teach (assigned to teacher)
- ✅ Subjects that exist in the class (assigned to class)
- ✅ **Intersection** of both = available options

### **Example:**

**Teacher can teach:**
- Math, Physics, Chemistry

**Class 1A has:**
- Math, English, Physics

**Available options for Class 1A:**
- ☑️ Math (✓ teacher knows it, ✓ class has it)
- ☑️ Physics (✓ teacher knows it, ✓ class has it)
- ❌ English (teacher doesn't know it)
- ❌ Chemistry (class doesn't have it)

---

## 🔄 Complete Workflow

```
1. Admin creates Teacher
   ↓
2. Admin assigns Subjects to Teacher
   (teacher_subject table)
   ↓
3. Admin assigns Classes to Teacher
   (class_subject table with teacher_id)
   ↓
4. Teacher logs in and sees their:
   - Assigned Classes
   - Subjects they teach in each class
```

---

## 📊 Use Cases

### **Use Case 1: Math Specialist**

**Teacher:** Sarah Johnson

**Step 1 - Assign Subjects:**
- MATH101 - Basic Mathematics
- MATH201 - Advanced Mathematics
- MATH301 - Calculus

**Step 2 - Assign Classes:**
- **Class 1A:** MATH101
- **Class 1B:** MATH101
- **Class 2A:** MATH201
- **Class 3A:** MATH301

**Result:** Sarah teaches math across 4 classes, different levels

---

### **Use Case 2: Multi-Subject Teacher**

**Teacher:** Robert Brown

**Step 1 - Assign Subjects:**
- PHY101 - Physics
- CHEM101 - Chemistry
- SCI101 - General Science

**Step 2 - Assign Classes:**
- **Class 1A:** PHY101, CHEM101
- **Class 2A:** SCI101
- **Class 2B:** PHY101

**Result:** Robert teaches multiple subjects in multiple classes

---

### **Use Case 3: Part-Time Teacher**

**Teacher:** Emily Davis

**Step 1 - Assign Subjects:**
- ART101 - Art
- MUS101 - Music

**Step 2 - Assign Classes:**
- **Class 1A:** ART101
- **Class 2A:** ART101
- **Class 3A:** MUS101

**Result:** Emily teaches limited classes (part-time)

---

## 🎯 Key Features

### ✅ **Multiple Classes**
- A teacher can teach in as many classes as needed
- No limit on number of classes

### ✅ **Multiple Subjects per Class**
- Teacher can teach multiple subjects in same class
- Example: Math AND Physics in Class 1A

### ✅ **Different Subjects per Class**
- Teach Math in Class 1A
- Teach Physics in Class 2A
- Teach Chemistry in Class 3A

### ✅ **Smart Filtering**
- Only shows relevant subject-class combinations
- Based on:
  - Teacher's assigned subjects
  - Class's assigned subjects

---

## 🗄️ Database Structure

### **teacher_subject Table:**
```
teacher_id | subject_id | academic_year_id
-----------+------------+-----------------
1          | 1          | 1
1          | 2          | 1
```
*What subjects a teacher CAN teach*

### **class_subject Table:**
```
class_id | subject_id | teacher_id
---------+------------+-----------
1        | 1          | 1
1        | 2          | 1
2        | 1          | 1
```
*What subjects a teacher ACTUALLY teaches in specific classes*

---

## 📝 Important Notes

### **Assignment Order:**
1. ✅ **First:** Assign subjects to teacher
2. ✅ **Then:** Assign classes to teacher
3. ❌ **Don't skip step 1!** - Teacher needs subjects before class assignment

### **Dependencies:**
- Teacher must exist
- Teacher must have assigned subjects
- Classes must exist
- Classes must have assigned subjects

### **Updates:**
- Can reassign classes anytime
- Previous assignments are cleared
- New assignments are saved

---

## 🔄 Updating Assignments

### **To Change Class Assignments:**
1. Go to teacher details
2. Click "Assign Classes"
3. Check/uncheck as needed
4. Click "Assign Classes"
5. Old assignments are replaced with new ones

---

## ✅ Quick Checklist

Before assigning classes:
- [ ] Teacher exists and is active
- [ ] Teacher has assigned subjects (Step 1)
- [ ] Classes exist and are active
- [ ] Classes have assigned subjects
- [ ] You're logged in as Admin

---

## 🎓 Summary

**Two-Step Process:**

1. **Teacher-Subject Assignment**
   - What subjects CAN the teacher teach?
   - Stored in: `teacher_subject` table

2. **Teacher-Class Assignment**
   - Which classes WILL the teacher teach those subjects in?
   - Stored in: `class_subject` table (teacher_id column)

**Result:** Complete teaching schedule for each teacher!

---

**For questions, refer to SCHOOL_SYSTEM_GUIDE.md**

