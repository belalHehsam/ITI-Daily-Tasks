-- -- intersect 
-- -- employees d = 1 , sal > 85000
-- select emp_id , first_name from employees 
-- where dept_id = 1 
-- intersect 
-- select emp_id , first_name from employees 
-- where salary > 85000
---------------------------------------------------

-- Except :
-- select emp_id , first_name from employees 
-- except 
-- select e.emp_id ,e.first_name 
-- from employees e 
-- join employee_projects ep 
-- on e.emp_id = ep.emp_id 
---------------------------------------------------
-- all / any : 
-- all [must all true ]        =====  AND 
-- any [at least one is true]  =====  OR
-- select first_name , last_name , salary from employees 
-- where salary > any (select avg(salary) from employees group by dept_id)

-- select first_name , last_name , salary from employees 
-- where salary > all (select avg(salary) from employees group by dept_id)
---------------------------------------------------
-- insert from select 
-- insert into salary_history (emp_id , old_salary , new_salary , changed_by)
-- select emp_id , salary , salary * 1.10 , 'ahmed' from employees 
-- where emp_id  = 1 ;

-- select * from salary_history ; 
---------------------------------------------------
-- insert with return

-- insert into projects (project_name , start_date , budget , status , dept_id)
-- values ('AI' , '2025-05-01' , 300000 , 'planning' , 1 )
-- returning project_id , project_name ;

-- update with return 
-- update employees set salary = salary *1.1 where dept_id = 3 
-- returning emp_id , first_name , salary ; 

-- delete with return 

-- select * from salary_history 
-- delete from salary_history where emp_id = 1 
-- returning emp_id ;

-- select * from salary_history 
---------------------------------------------------
-- how deal with conflicts  : 
-- do nothing 
-- insert into departments (dept_name, location ) 
-- values ('engiineering' , 'cairo ')
-- on conflict (dept_id) do nothing ;

-- do update 
-- insert into employees (emp_id , first_name , last_name , salary , email , hire_date , dept_id)
-- values(1,'ahmed' , 'ali' ,50000 , 'a@a.com' , '2020-02-01' , 1)
-- on conflict (emp_id) do update 
-- set salary = excluded.salary , updated_at = now() ; 

-- [search >>> new , old ]
-- ----------------------------------------------------
-- ----------------------------------------------------
-- Merge : 
-- postgres(15+) 
/*
do 3 queries >>>> insert , update , delete 
do 2 queries >>>> insert , update 


1. comparison bet old data , new data 
2. if found >> update 
3. if not found >> insert 
*/

-- merge into employees as target 
-- using(values (9,'test ' , 'user ' , 'test@iti.com' , 50000 , 1))
-- as source (emp_id , first_name , last_name, email , salary , dept_id)
-- on target.emp_id =  source.emp_id 
-- when matched then 
-- update set salary = source.salary 
-- when not matched then 
-- insert (emp_id , first_name , last_name, email , salary , dept_id)
-- values (source.emp_id , source.first_name , source.last_name , source.email , source.salary , source.dept_id);

-----------------------------------------------------------------------------------
-- copy :
-- create new table from query result : 
-- select emp_id , first_name , last_name , salary , dept_id 
-- into engineering_employees 
-- from employees 
-- where dept_id = 1 ; 

-- select * from engineering_employees ; 

-- drop table if exists engineering_employees ;

-------------------------------------------------
-- report :
-- create table dept_summary as 
-- select d.dept_id , d.dept_name ,count(e.emp_id) as headcount , avg(e.salary) , sum(e.salary) 
-- from departments d 
-- left join employees e 
-- on d.dept_id = e.dept_id 
-- group by d.dept_id  , d.dept_name ; 

-- select * from dept_summary;
-------------------------------------------------
-- create table from table with no data [structure ]

-- create table employees_backup as 
-- select * from employees with no data ; 

-- select * from employees_backup;

-- create table with only strycture 
-- create table engineering_employees as 
-- select * from employees where false ;

-- select * from engineering_employees;

-- data + structure 
-- create table employees_backup_2 as 
-- select * from employees  ; 

-- select * from employees_backup_2 ;


-- using like [data + structure + constraints + indexes + defaults ]...
-- create table copy_2 (like employees including all ) ;


-- partial copy  
-- creat table to only high earners 
-- create table high_earners as 
-- select * from employees where salary > 100000 ; 

-- select * from high_earners


--------------------------------------------------
-- Data types of postgres 
/*
numeric : 
1. smallint 
2. int /integer 
3. bigint
4. serial 
5. numeric
*/ -- search 

/*
character types : 
1. char       >> name char(50)  >>> ali  >> use 3 places but i still reserve 47 
2. varchar    >> dynamic type >>  >> name varchar(50)>>> ali  >> use 3 places but 47 is released to memory
3. text       >> with unlimited length 

*/



/*
--  date time : 
1. date 
2. time 
3. timetz >> time with time zone 
4. timestamp >> date + time 
5. timestamptz >> date + time + time zone 
6. interval >>[ store diff between dates or times ]
   ex ..  duration  interval 
   ex ..  name      text 
*/
/*
-- other data types : 
1. boolen   t , f 
2. json     json format 
3. jsonb    like json 
4. array    [1,2,3,4]
5. bytea    binary data  
6. inet     ipv4 , ipv6 
7. macaddr  mac address 
8. point     2d 

*/
-- diff between json , jsonb
-----------------------------------------------------
-- type casting : 
-- select '2024-05-06' ::date ;
-- select '55' ::integer ; 
-- select 42 ::text ;

-- select cast('3.14' as numeric) ;

----------------------------------------------------
-- constraints : 
/*
1. primary key 
2. foregin key 
3. unique 
4. nol null 
5. check 
6. exclude 
*/
-- default is constraint ?????? NO 
-----------------------------------------------------------
-- work json , jsonb , array  

-- update employees set 
-- metadata ='{"skils" : ["python" ,"html" , "css"] , 
--            "cretifications" : ["AWS" ,"AZURE"] , 
-- 		   "emergency_contaacts" : {"name" : "ali" , "phone" : "0100010101"} , 
-- 		   "years" : 8 }' where emp_id = 1 ; 

-- select * from employees where emp_id = 1 ; 

		 
-- select metadata ->'skils'  from employees where emp_id = 1 ; 
-- select metadata ->'years'  from employees where emp_id = 1 ; 

-- select metadata -> 'emergency_contaacts' ->>'name' from employees where emp_id = 1 ; 

-- select metadata -> 'skils' -> 1 from employees where emp_id = 1 ; 


-- search  :
-- path operator 
-- contains operator 

-------------------------------------------------
-- defaults : 
-- create table orders (
-- i_id serial primary key ,
-- p_name varchar(50) not null , 
-- quantity integer default 1 , 
-- u_price numeric(10,2) default 0.00 , 
-- discount numeric(10,2) default 0.00 , 
-- created_at timestamptz default now() , 
-- created_by text default current_user 
-- ) ; 
-- insert into orders (p_name , u_price) values ('laptop' , 10000) ; 

-- select * from orders ; 
-------------------------------------------------------------
-- variables :

-- do $$                                 -- all code as one block 
-- declare                               -- this is for decaring variables 
-- v_count integer ;                     -- var with no value 
-- v_dept_name text := 'enginering' ;    -- inilization 
-- c_tax_rate constant numeric := .15 ;  -- constant variable 

-- begin 
-- select count(*) into v_count from employees where dept_id = 1 ; 


-- raise notice 'dept number 1 named % , has % employees  , and it tax rate is % ' , v_dept_name , v_count , 
-- c_tax_rate ;
 
-- end ; 
-- $$ ;
---------------------------------------------------------------------
-- enum  : 
-- create type emp_level as enum('jonuir' , 'senior' , 'lead') ; 
-- create type days_of_week as enum('sat' , 'sun' , 'mon' , 'tue' , 'wed' , 'thu' , 'fri') ; 

-- alter table employees add column level emp_level default 'jonuir' ; 

-- update employees set level = 'senior' where salary between 85000 and 100000 ; 
-- update employees set level = 'lead' where salary >100000 ; 


-- select * from employees 

------------------------------------------------------------------------
-- composite type  :
-- create type address as (
-- street  text ,
-- city    text , 
-- country text 
-- ) ; 



-- create table employees_adresses (
-- emp_id  integer references employees(emp_id) , 
-- home address , 
-- work address 
-- ) ; 

-- insert into employees_adresses values (1,
-- row('1234x' , 'cairo' , 'Egypt') ,
-- row('12345678x' , 'alex' , 'Egypt')   
-- );

-- select * from employees_adresses ; 

-- how to use : 
-- select (home).city as home_city from employees_adresses; 
-- select (work).country as demo from employees_adresses; 
-----------------------------------------------------------------------


















































































