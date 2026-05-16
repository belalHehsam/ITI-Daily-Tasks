-- Coalesce  
-- returns first not null value 

-- select manager_id from employees ; 
-- select first_name , coalesce(manager_id::text , 'no manager' ) as manager  from employees ; 


-- select project_name , coalesce (status , 'unknown') as p_status from projects ;

-- select manager_id from employees ; 
---------------------------------------------------------------------
-- nullif 
--> two values (the same ) >>> null 
--> two values (diff ) >>> value of the first 
/*
 7 , 14      > 7 
 ali , sami > ali 
 omar , omar > null 
*/
-- select dept_id, sum(salary) / nullif(count(*) , 0) as avg 
-- from employees
-- group by dept_id ; 

/***
count(value , 0)  >>>> value 
count(0 , 0)  >>>> null    >>> sum / null === > null 

**/
------------------------------------------------------------------
--- replace empty phone num with def 
-- select phone_number from employees ; 

-- select first_name , coalesce(nullif(phone_number , '') , 'no phone number' ) as phone_display 
-- from employees ; 
------------------------------------------------------------------
/**********    temp table   *************/
-- table only on your session (once exit no table )

-- create temp table top_earnes as select * from employees ; 

-- select * from top_earnes;
------------------------------------------------------------------
-- index : 
-- create index idx_emp_dept on employees(dept_id) ;


-- unique index 
/*
ali 
ahmed 
sa,i 
sara 
ola 
ahmed 
create unique index >>>> error xxxxxxxxx
*/

-- create unique index idx_emp_email on employees(email) ; 

/* default algorithm is b-tree */ 

-- -- how to change algorithm
-- create index idx_emp_sal on employees using hash(salary) ; 

-- partial index ( index at some rows not all) 

-- create index idx_emp_active on employees(salary) where is_active = true ;


-- how to see all index 
-- select indexname , indexdef from pg_indexes where tablename = 'employees' ; 


-- how to drop index 
-- drop index if exists idx_emp_sal;

----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------
-- view : 

-- create view employee_details as 
-- select * from employees ;

-- -- how to use  
-- select * from employee_details ; 
-- select * from employee_details where dept_id = 1  ; 

-- test cases for join ....................
---------------------------------------------------------------
-- materialized view : 
-- create materialized view deptt_summary as 
-- select * from departments ;

/*
insert some data 
update some date 
delete some data 

------> materialzed view still see defore insert , update , delete 
*/

-- how to get live data 
-- refresh materialized view deptt_summary ;

-- drop view  employee_details ; 
-- drop materialized view  deptt_summary ; 

------------------------------------------------------------
-- updatable view : 

-- create or replace view active_employees as 
-- select * from employees where is_active = true ; 

-- how to text :
-- update active_employees set salary = salary * 1.1 where dept_id = 2 ; 


-- when to use updatable , materialized ????? search 
------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------

-- -- trigger : 
-- create or replace function log_salary ()
-- returns trigger 
-- as $$ 
-- begin 
-- if old.salary is distinct from new.salary then 
-- insert into salary_history(emp_id , old_salary , new_salary , changed_by) 
-- values (old.emp_id , old.salary , new.salary , current_user ) ;
-- end if ; 
-- new.updated_at = now() ;
-- return new ; 
-- end ; 
-- $$ language plpgsql ; 

-- -- how to create trigger 
-- create trigger trg_salary 
-- before update on employees 
-- for each row 
-- execute function log_salary() ; 

-- -- how yo test : 

-- update employees set salary = 50 where emp_id = 8; 

-- select * from salary_history ; 

--------------------------------------------

-- create or replace function notify_user()
-- returns trigger 
-- as $$  
-- begin 
-- raise notice 'i added new employee % % ' , new.first_name , new.last_name ; 
-- return new ; 
-- end ; 
-- $$ language plpgsql 



-- create trigger new_emp 
-- after insert on employees 
-- for each row 
-- execute function notify_user();

-- -- how to test 
-- insert into employees(first_name , last_name , email , phone_number , hire_date ,salary , dept_id )
-- 			    values('ahmed' , 'ali' ,'ahmed@iti.go.eg' ,'01097143595' ,'2025-05-01', 90000,1);



-- how to enable / disable trigger 
-- alter table employees disable trigger  new_emp;
-- alter table employees enable trigger  new_emp;

-- how to delete trigger  
-- drop trigger if exists new_emp on employees ; 

-- how to see all triggers : 
-- select trigger_name , event_manipulation , event_object_table from information_schema.triggers;
--------------------------------------------------------------
-- transaction 

-- begin ; 
-- update employees set salary = salary *1.1 where emp_id = 8 ;
-- insert into salary_history(emp_id , old_salary , new_salary , changed_by)
-- values (1,50000 , 70000 , 'new user ') ; 
-- commit ; 

-- select * from employees where emp_id = 8 ; 


-- begin ; 
-- delete from employees where emp_id = 8 ; 
-- /**** list of querries */ 
-- rollback ; 

-- select * from employees where emp_id = 8 ; 
------------------------------------------------------------------
-- savepoints 

-- begin ; 
-- update department set budget = budget - 1000 where dept_id = 1 ; 

-- savepoint atfter_deduct ; 

-- update department set budget = budget - 20000 where dept_id = 2 ; 

-- savepoint after_deduct_2 ; 

--  -- undo to specific step ... 
-- rollback to savepoint atfter_deduct ;

-- commit ; 
---------------------------------------------------------------------
---------------------------------------------------------------------
---------------------------------------------------------------------
-- How to deal with role :

create role read_only_group ; 
create role read_write_group ; 
create role admin_group ; 


















































