-- case expression  : 
-- select first_name , salary , 
-- case  when salary > 120000 then 'rich' 
--       when salary > 90000 then  'middle' 
-- 	  when salary > 70000 then 'poor'
-- 	  else 'not valid' 
-- 	 end as level 
-- from employees ;
-----------------------------------------------
-- if - else  : 
-- do $$ 
-- declare  v_salary numeric ; 
--          v_grade text ; 
-- begin 
-- select salary into v_salary from employees where emp_id = 9 ; 

-- if v_salary >= 120000   then v_grade := 'Executive';
-- elsif v_salary >= 90000 then v_grade := 'senior' ; 
-- elsif v_salary >= 70000 then v_grade := 'mid-level';
-- else  v_grade := 'junior' ; 
-- end if ;
-- raise notice 'salary: %  , grade: %' ,v_salary , v_grade ; 
 
-- end ; 
-- $$ ; 


/*
$$ 
all here once 
$$
*/

------------------------------------------------------------------------
-- loop with exit :
-- do $$ 
-- declare i integer := 1 ; 
-- begin 
-- loop 
--   exit when i > 5 ; 
--   raise notice 'i = % ' , i ; 
--   i := i+1 ; 
--   end loop ; 
-- end ; 
-- $$ ; 
------------------------------------------------------------------------
-- while loop : 
-- sum of numbers from 1 : 10 :
-- do $$ 
-- declare 
--           i integer := 1 ; 
-- 		  v_sum integer := 0 ; 
-- begin 
-- while i <=10 loop 
-- v_sum := v_sum + i ; 
-- i :=i+1 ; 
-- end loop ; 
-- raise notice 'sum of nums from 1 to 10 = %' , v_sum ; 
-- end ; 
-- $$ ; 
------------------------------------------------------------------------
-- for loop : 
-- do $$ 
-- begin 
--        for i in 1..5 loop 
-- 	   raise notice 'step %' , i ; 

-- 	  end loop ; 
-- 	 end ; 
-- 	 $$ ; 
------------------------------------------------------------------------
-- get top three salaries of employees & print their names & salary : 
-- do $$ 
-- declare rec record ; -- row (store res of each row )

-- begin 
-- for rec in 
--        select first_name , salary from employees order by salary desc limit 3 
-- 	   loop 
-- 	   raise notice '% his/her salary is :  % ', rec.first_name , rec.salary ;
-- end loop ; 
-- end ; 
-- $$ ; 

/*
search >>> output (table ) 
search >>> continue ... 
*/ 
-----------------------------------------------------------------------

-- function & procedure 

-- /*******  function **************************/ 
-- create or replace function get_employee_count(p_dept_id  integer)
-- returns integer as $$ 
-- select count(*) from employees where dept_id = p_dept_id ; 
-- $$ language sql ; 

-- -- how to use  
-- select get_employee_count(1);
-- select get_employee_count(3);
------------------------------------------------------------------
/****************determine level based salary ********************/
-- create or replace function get_employee_level(p_emp_id   integer)
-- returns text 
-- as $$ 
-- declare v_salary numeric ; 
-- begin 
-- -- get the salary 
-- select salary into v_salary from employees where emp_id = p_emp_id ; 

-- if v_salary is null
-- then return 'employee not found' ; 
-- elsif v_salary > 10000 
-- then return 'high level'; 
-- elsif v_salary > 50000 
-- then return 'mid level';
-- else 
-- return 'low level';
-- end if ; 
-- end ; 
-- $$ language plpgsql ; 

-- -- how to use  
-- select get_employee_level(1);
--------------------------------------------------------------------
/* proceduer */
-- transfer employee from dept to another : 
-- create or replace procedure trasfer_employee(

-- p_emp_id  int ,
-- p_new_dept int 
-- )
-- language plpgsql 
-- as $$ 
-- begin 
-- update employees set dept_id = p_new_dept , 
-- updated_at = now() 
-- where emp_id = p_emp_id ; 

-- raise notice 'employee % has trasferd to department % ' , p_emp_id , p_new_dept ; 
-- end ; 
-- $$ ; 



-- -- how to use  
-- call trasfer_employee(3,1)
--------------------------------------------------------------------

/* String Functions */ 

-- concatenation
-- select first_name || ' ' || last_name as full_name from employees;
-- select concat(first_name, ' ', last_name) from employees;

-- case
-- select upper(first_name), lower(last_name) from employees;
-- select initcap('hello world');  

-- -- trim
-- select '       hello '

-- select trim('  hello  ');
-- select ltrim('  hello');
-- select rtrim('hello  ');

-- select trim(both 'x' from 'xxxhelloxx');

-- length
-- select length(first_name) from employees;    -- num of bytes  
-- select char_length(email) from employees;    -- num of chars  

-- substring
-- select substring(email from 1 for 5) from employees;
-- select substr(email, 1, 5) from employees;

-- position / search
-- select position('@' in email) from employees;
-- select strpos(email, '@') from employees;

-- replace
-- select replace(email, '@corp.com', '@company.com') from employees;
-- select email from employees ;

-- padding

-- select lpad(emp_id::text, 5, '0') as padded_id from employees;
-- select rpad(first_name, 10, '.') from employees;

-- -- repeat / reverse
-- select repeat('ab', 3);  
-- select reverse('hello');  

-- format
-- select format('employee %s earns %s', first_name, salary) from employees;

/**********************************************************************************/
-- select age(now(), hire_date) as tenure from employees;
/**********************************************************************************/
-- select abs(-42);
-- select ceil(4.2);
-- select floor(4.9);
-- select round(4.567, 2);
-- select trunc(4.9);      -- remove decimal 
-- select mod(17, 5);
-- select power(2, 10);
-- select sqrt(144);
-- select pi();
-- select random();  --- 0 : 1
/**********************************************************************************/

-- -- ascii and chr
-- select ascii('F');              
-- select chr(76);                     
       
-- select chr(ascii('m') - 32); -- lower to upper case 
--------------------------------------------------------------
--------------------------------------------------------------
--------------------------------------------------------------
-- window function : 
-- row_number()
-- select first_name , dept_id , salary , 
-- row_number() over (partition by dept_id order by salary desc  )  as rank_dept 
-- from employees ; 

----------------------------------
-- rank() , dence_rank()
-- select first_name , salary , 
-- rank() over(order by salary desc ) as rank_with_gaps,
-- dense_rank() over(order by salary desc ) as rank_with_no_gaps
-- from employees ;
----------------------------------
-- lag // lead 
-- select first_name , salary , 
-- lag(salary) over(order by hire_date ) as prev_col , 
-- lead(salary) over(order by hire_date ) as next_col  
-- from employees ;


----------------------
-- first_value 

-- select first_name , dept_id , salary , 

-- first_value(salary) over(partition by dept_id order by salary desc ) as top_salary 
-- from employees ;
-- -----------------------------------------





















































