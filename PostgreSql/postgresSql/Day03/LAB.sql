-- Q1
select first_name, salary,
       RANK() over(order by salary desc) as rank,
       DENSE_RANK() over(order by salary desc) as dense_rank
from professors;
==============================================================================
-- Q2
select * from students

select student_id, first_name,last_name, enroll_date, gpa, 
LAG (gpa) over(order by enroll_date) as prev_gpa,
LEAD (gpa) over(order by enroll_date) as next_gpa
from students;
==============================================================================
-- Q3
select scholarship_id, student_id, amount, start_date,
sum(amount) over(order by start_date, scholarship_id) as running_total
from scholarships;
==============================================================================
-- Q4
select student_id,first_name,gpa,
NTILE(4) over(order by gpa) as quartile,
case
	when NTILE(4) over(order by gpa)= 1 then 'Top'
	when NTILE(4) over(order by gpa)= 2 then 'Upper Mid'
	when NTILE(4) over(order by gpa)= 3 then 'Lower Mid'
	else 'Low'
end as label 		
from students	
==============================================================================
-- Q5
select * from courses

SELECT 
    course_code,
    substring(course_code from 1 for 3) as first_3_chars,

    POSITION(
		--(substring) return the first position that match regex
        substring(course_code from '[0-9]') in course_code
    ) AS first_digit_position

FROM courses;
==============================================================================
-- Q6
create or replace function get_dept_student_count(p_dept_id int)
returns int
as $$
declare 
	total int :=0;
begin

	select count(student_id)
	into total
	from students
	where dept_id=p_dept_id;
	return total;
	
END;
$$ LANGUAGE plpgsql;


select * get_dept_student_count(4);
==============================================================================
-- Q7
create or replace function give_gpa_bonus(p_dept_id int, p_bonus_percent numeric)
returns table(
	student_name text,
	old_gpa numeric,
	new_gpa numeric
)
as $$
	select 
	first_name ||' '|| last_name as student_name,
	gpa as old_gpa,
	gpa + ( (gpa * p_bonus_percent) /100 ) as new_gpa 
	from students
	where dept_id=p_dept_id;
	
$$ language sql;


select * from give_gpa_bonus(4, 10);
==============================================================================
-- Q8

create or replace procedure transfer_student(p_student_id int, p_new_dept_id int)

as $$
begin
    update students
    set dept_id = p_new_dept_id
    where student_id = p_student_id;
    raise notice 'Student % moved to department %', p_student_id, p_new_dept_id;
end;
$$ language plpgsql;

call transfer_student(3,5)
