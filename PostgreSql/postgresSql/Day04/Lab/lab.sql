-- Q1
select * from students 

select first_name ,coalesce(nationality, 'unknown' ) as nationality 
from students

===========================================================================================
-- Q2
-- use NULLIF to treat a GPA of 0.0 as NULL. Show student name, their real GPA, and a cleaned 
-- version where 0.0 becomes NULL


select first_name , gpa as real_gpa , nullif(gpa ,0.0) as cleand_gpa
from students
===========================================================================================
-- Q3
-- Combine COALESCE + NULLIF: show each student's GPA. If GPA is NULL or 0.0, display 'Not 
-- Evaluated'

insert into students(student_id,first_name,last_name, email,birthdate,gender,dept_id,is_active)
values(100,'Belal','Hesham','belal@gmail.com','2001-10-24', 'Male', 1 ,true)

select first_name, coalesce(nullif(gpa, 0.0 )::text ,null ,'Not Evaluated') as gpa
from students
===========================================================================================
--Bouns
-- Use NULLIF to calculate average GPA per department, avoiding division by zero. Use 
-- COALESCE to replace NULL results with 0. Show dept_name, student count, and safe average GPA

select dept_name ,count(*) as student_Count ,coalesce(sum(gpa) /nullif(count(*) ,0), 0) as avg_gpa
from students s 
inner join departments d
on s.dept_id= d.dept_id
group by dept_name
===========================================================================================
-- Q4
-- Create a temporary table temp_course_stats with: course_code, course_name, 
-- enrolled_count, avg_grade. Then find courses where avg_grade is above 75

create temp table temp_course_stats AS 
select c.course_code , c.course_name, count(e.enrollment_id) as enrolled_count,
	   coalesce(avg(e.grade) , 0) as avg_grade
	   from courses c
	   inner join enrollments e
	   on c.course_id=e.course_id
	   group by c.course_code, c.course_name;

select * from temp_course_stats   
===========================================================================================
-- Q5
-- Create a B-tree index on dept_id in the students table.
create index dept_index on students(dept_id)
select indexname , indexdef from pg_indexes where tablename = 'students' ;
===========================================================================================
-- Q6
-- Create a UNIQUE index on the email column of students. Then try to insert a duplicate email 
-- and observe the error.

create unique index students_email_index on students(email)
select indexname , indexdef from pg_indexes where tablename = 'students' ;

insert into students(student_id,first_name,last_name, email,birthdate,gender,dept_id,is_active)
values(101,'Belal','Hesham','belal@gmail.com','2001-10-24', 'Male', 1 ,true)
===========================================================================================
-- Q7
-- Create a Partial index on salary in professors — only for active professors (is_active = TRUE)
create index idx_professor_active on professors(salary) where is_active = true 
select indexname , indexdef from pg_indexes where tablename = 'professors' ;
===========================================================================================
-- Q8 
-- Create a view called v_student_details showing: student_id, full_name, email, gpa, 
-- dept_name, faculty_name. Query it to list students in dept_id = 3.

select * from departments

create view v_student_details as 
select s.student_id ,s.dept_id , (s.first_name || ' ' ||s.last_name) as fullname ,s.email,s.gpa,
		d.dept_name, f.faculty_name
		from students s 
		inner join departments d
		on s.dept_id= d.dept_id
		inner join faculties f
		on d.faculty_id=f.faculty_id

select * from v_student_details	where dept_id=3
===========================================================================================
-- Q9
--لاثمشميشنمبىشسينمبسينبنسمنب