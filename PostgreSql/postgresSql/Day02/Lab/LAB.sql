select * from faculties
-- Q1
insert into faculties (faculty_name,dean,building,budget)
values('Faculty of Law','Dr. Hany Aziz','G',8000000)
returning faculty_id 
=============================================================
-- Q2
select * from professors

update professors
set salary= salary*1.15 
where dept_id=3
returning first_name,
          salary / 1.15 as old_salary,
          salary as new_salary;
=============================================================
-- Q3
update students
set is_active=false
where gpa<2.0 
and enroll_date<'2022-01-01'
returning first_name
=============================================================
-- Q4
insert into enrollments (student_id,course_id,semester,year)
values(5,1,'Fall',2023)
on conflict (enrollment_id) do nothing
=============================================================
-- Q5
select * from enrollments

update enrollments
set grade = 98,
    letter_grade = 'A+'
where student_id = 1
  and course_id = 3
  and semester = 'Fall'
  and year = 2022;
=============================================================
-- Q6
select * from students

merge into students as target 
using(values(99,'Belal','Hesham','New Address'))
as source (student_id,first_name,last_name,address)
on target.student_id=source.student_id
when matched then 
update set address = source.address 
when not matched then 
insert (student_id,first_name,last_name,address)
values (source.student_id,source.first_name,source.last_name,source.address)
=============================================================
-- Q7
select * from students

select * 
into high_gpa_students
from students
where gpa>=3.5
=============================================================
-- Q8
select * from departments

select * from students
select * from scholarships

create table dept_summary as 
select d.dept_name ,count(s.student_id) as student_count,
  avg(s.gpa) as avg_gpa,
  sum(sc.amount) as total_scholarship
from departments d 
left join students s 
on d.dept_id = s.dept_id 
left join scholarships sc
on s.student_id = sc.student_id
group by d.dept_name ; 

select * from dept_summary;
=============================================================
-- Q9
create table enrollments_no_data as 
select * from enrollments with no data ; 

create table enrollments_v2 (like enrollments including all);

insert into enrollments_v2
select * from enrollments

select * from enrollments_v2
=============================================================
-- Q10

create table exam_results (
  student_id serial primary key,
  student_name text ,
  status text default 'pending',
  score int default 0,
  exam_date date default current_date,
  created_by text default current_user
);

insert into exam_results (student_name)
values ('belal');

insert into exam_results (student_name, status, score, exam_date, created_by)
values ('khaled', 'completed', 95, '2024-01-01', 'admin');

select * from exam_results
=============================================================
-- Q11
select * from students
select 
  first_name,
  metadata -> 'hobbies' ->> 0 as first_hobby,
  jsonb_array_length(metadata -> 'languages') as languages_count,
  (metadata ->> 'laptop')::boolean as has_laptop
from students
where metadata is not null;
=============================================================
-- Q12
create type student_level as enum 
('Freshman', 'Sophomore', 'Junior', 'Senior');

alter table students
add column level student_level;


update students
set level = 'Freshman'
where gpa between 0 and 1.99;


update students
set level = 'Sophomore'
where gpa between 2.0 and 2.49;


update students
set level = 'Junior'
where gpa between 2.5 and 3.49;


update students
set level = 'Senior'
where gpa between 3.5 and 4.0;


select * from students
=============================================================
-- Q13
create type contact_info as (
  phone text,
  email text,
  city text
);

create table student_contacts (
  student_id int,
  contact contact_info
);

insert into student_contacts (student_id, contact)
values (1,('0100000000', 'test@test.com', 'Cairo') );

select * from student_contacts

