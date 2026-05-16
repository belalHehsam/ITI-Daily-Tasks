 /*  
 To deal with terminal : 
-- \l list all databases 
-- \c DB_name  connect database 
-- \dt list all tables
-- \d table name descreption of table structure 
-- \du list all users 
-- \dn list all schemas ************
-- \df list all funs 
-- \dv list all views 
-- \di list all indexes 
-- \e (open text editor to write query )
-- \q exit from DBMS
-- \? help for sql 
-- \h clause_name help about it 
-- \copy to/from specific file 
-- \set  create variable 
-- \echo print satatement 
-- \i  sql file (to execute)
*/

-- create database company_db ; 

-- create database x 
-- owner = ahmed , 
-- encoding = 'utf8' -- support arabic , emogies , E ;
------------------------------------------------------------
-- rename database 
-- alter database ccc rename to nn ; 

----------------------------------------------------------

-- drop database 
-- drop database if exists nn ;  

----------------------------------------------------------
-- catalog of postgres 
--         database of database 
-- select * from pg_tables ;

-----------------------------------------------------------
-- create new structure for our database : 
-- -- DEPARTMENTS table
-- CREATE TABLE departments (
--   dept_id    SERIAL PRIMARY KEY,
--   dept_name  VARCHAR(100) NOT NULL UNIQUE,
--   location   VARCHAR(100),
--   budget     NUMERIC(15,2) DEFAULT 0.00,
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );
-- ----------------------------------------------------------------------
-- -- EMPLOYEES table
-- CREATE TABLE employees (
--   emp_id       SERIAL PRIMARY KEY,
--   first_name   VARCHAR(50) NOT NULL,
--   last_name    VARCHAR(50) NOT NULL,
--   email        VARCHAR(150) UNIQUE NOT NULL,
--   phone        VARCHAR(20),
--   hire_date    DATE NOT NULL DEFAULT CURRENT_DATE,
--   salary       NUMERIC(10,2) CHECK (salary > 0),
--   dept_id      INTEGER REFERENCES departments(dept_id) ON DELETE SET NULL,
--   manager_id   INTEGER REFERENCES employees(emp_id),
--   is_active    BOOLEAN DEFAULT TRUE,
--   metadata     JSONB,
--   created_at   TIMESTAMPTZ DEFAULT NOW(),
--   updated_at   TIMESTAMPTZ DEFAULT NOW()
-- );
-- ----------------------------------------------------------------------
-- -- PROJECTS table
-- CREATE TABLE projects (
--   project_id   SERIAL PRIMARY KEY,
--   project_name VARCHAR(200) NOT NULL,
--   start_date   DATE,
--   end_date     DATE,
--   budget       NUMERIC(15,2),
--   status       VARCHAR(20) DEFAULT 'planning'
--                CHECK (status IN ('planning','active','completed','cancelled')),
--   dept_id      INTEGER REFERENCES departments(dept_id)
-- );
-- ----------------------------------------------------------------------
-- -- EMPLOYEE_PROJECTS (junction table)
-- CREATE TABLE employee_projects (
--   emp_id     INTEGER REFERENCES employees(emp_id) ON DELETE CASCADE,
--   project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE,
--   role       VARCHAR(100),
--   hours      INTEGER DEFAULT 0,
--   PRIMARY KEY (emp_id, project_id)
-- );
-- ----------------------------------------------------------------------
-- -- SALARY_HISTORY table
-- CREATE TABLE  salary_history (
--   history_id  SERIAL PRIMARY KEY,
--   emp_id      INTEGER REFERENCES employees(emp_id) ON DELETE CASCADE,
--   old_salary  NUMERIC(10,2),
--   new_salary  NUMERIC(10,2),
--   changed_at  TIMESTAMPTZ DEFAULT NOW(),
--   changed_by  VARCHAR(100)
-- );

----------------------------------------------------------------------------- 
----------------------------------------------------------------------------- 
-----------------------------------------------------------------------------
-- data for my DB :
-- -- Insert departments
-- INSERT INTO departments (dept_name, location, budget) VALUES
--   ('Engineering',  'Cairo',      1500000.00),
--   ('Marketing',    'Alexandria', 800000.00),
--   ('Finance',      'Cairo',      1200000.00),
--   ('HR',           'Giza',       600000.00),
--   ('Sales',        'Cairo',      950000.00);
-- ----------------------------------------------------------------------
-- -- Insert employees
-- INSERT INTO employees (first_name, last_name, email, phone, hire_date, salary, dept_id) VALUES
--   ('Ahmed',   'Hassan',    'ahmed.hassan@corp.com',   '01001234567', '2020-03-15', 85000.00, 1),
--   ('Sara',    'Mohamed',   'sara.mohamed@corp.com',   '01112345678', '2019-07-01', 92000.00, 1),
--   ('Omar',    'Ali',       'omar.ali@corp.com',       '01223456789', '2021-01-10', 75000.00, 2),
--   ('Mona',    'Ibrahim',   'mona.ibrahim@corp.com',   '01334567890', '2018-11-20', 110000.00,3),
--   ('Khaled',  'Mahmoud',   'khaled.mahmoud@corp.com', '01445678901', '2022-06-05', 65000.00, 4),
--   ('Layla',   'Youssef',   'layla.youssef@corp.com',  '01556789012', '2020-09-01', 88000.00, 1),
--   ('Tariq',   'Farouk',    'tariq.farouk@corp.com',   '01667890123', '2017-04-12', 120000.00,3),
--   ('Nour',    'Samir',     'nour.samir@corp.com',     '01778901234', '2023-02-28', 60000.00, 5),
--   ('Hassan',  'Gamal',     'hassan.gamal@corp.com',   '01889012345', '2016-08-15', 135000.00,1),
--   ('Dina',    'Kamal',     'dina.kamal@corp.com',     '01990123456', '2021-11-11', 79000.00, 2);
-- ----------------------------------------------------------------------
-- -- Update managers
-- UPDATE employees SET manager_id = 9 WHERE emp_id IN (1, 2, 6);
-- UPDATE employees SET manager_id = 7 WHERE emp_id IN (4);
-- ----------------------------------------------------------------------
-- -- Insert projects
-- INSERT INTO projects (project_name, start_date, end_date, budget, status, dept_id) VALUES
--   ('E-Commerce Platform',  '2024-01-01', '2024-12-31', 500000, 'active',    1),
--   ('Marketing Campaign Q1','2024-01-15', '2024-03-31', 120000, 'completed', 2),
--   ('ERP Upgrade',          '2024-03-01', '2025-02-28', 800000, 'active',    1),
--   ('Sales Analytics',      '2024-06-01', '2024-11-30', 200000, 'active',    5),
--   ('HR Portal',            '2024-07-01', '2024-12-31', 150000, 'planning',  4);
-- ----------------------------------------------------------------------
-- -- Insert employee-project assignments
-- INSERT INTO employee_projects VALUES
--   (1, 1, 'Lead Developer',     160),
--   (2, 1, 'Backend Developer',  120),
--   (6, 1, 'Frontend Developer', 100),
--   (1, 3, 'Architect',          80),
--   (9, 3, 'Tech Lead',          60),
--   (3, 2, 'Campaign Manager',   90),
--   (10,2, 'Content Creator',    70),
--   (8, 4, 'Data Analyst',       110),
--   (5, 5, 'HR Coordinator',     95);

-----------------------------------------------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------

-- select * from employees ;

-----------------------------------------------------------------
--  Deal with schemas :

-- create schema HR ; 


-- create schema with specific user : 
-- create schema sales authorization postgres ; 


-- search path 
-- show search_path ;      -- public 

-- set search_path to hr , public ; 

-- show search_path ;
----------------------------------------------------------------
-- assign table to schema :

-- create table hr.employees (
-- id serial primary key , 
-- name text , 
-- salary numeric 
-- );
----------------------------------------------------------------
-- show all schemas :
-- select schema_name from information_schema.schemata ; 

----------------------------------------------------------------
-- drop specific schema : 

-- -- drop schema with all inside objects 
-- drop schema hr cascade ; 

-- -- fail if ojects found (defult)
-- drop schema hr restrict ;  -- employees xxxxx 

----------------------------------------------------------------
----------------------------------------------------------------
----------------------------------------------------------------
-- alter : 
-- add new column  
-- alter table employees add column middle_name varchar(50) ; 

-- delete column  
-- alter table employees drop column middle_name ; 


-- rename column 
-- alter table employees rename column phone to phone_number ; 


-- change type 
-- alter table employees alter column phone_number type text; 


-- select * from employees where is_active = true;

-- change default  : 
-- alter table employees alter column is_active set default false; 
-- select * from employees ; 


-- drop default  values: 
-- alter table employees alter column is_active drop default; 

-- add constraint:
-- alter table employees add constraint chk_salary check(salary between 1000 and 999999) ; 

-- test 
-- 1. case will get error 
-- insert into employees (first_name , last_name , email , hire_date , salary )
-- values('ahmed' , 'ali' , 'ahmed@iti.com' , current_date , 500 ) ; 

-- 2. case will execute 
-- insert into employees (first_name , last_name , email , hire_date , salary )
-- values('ahmed' , 'ali' , 'ahmed@iti.com' , current_date , 50000 ) ; 


-- drop constraint 
-- alter table employees drop constraint chk_salary ;

-- alter table employee_projects rename to em_projects ;

-- rename table : 
-- alter table em_projects rename to employee_projects ;
-------------------------------------------------------------------------
-------------------------------------------------------------------------
-- remove table : 

-- drop table : 
-- drop table if exists salary_history ; 

-- truncate  
-- truncate table salary_history ; 

-- -- reset id 
-- truncate table salary_history restart identity ; 


-----------------------------------------------------------------------
-----------------------------------------------------------------------
-----------------------------------------------------------------------
-- select * from employees 

-----------------------------------------------------------------------
-- select first_name from employees ;

-----------------------------------------------------------------------
-- alias 

-- select emp_id as id , 
-- first_name || ' ' || last_name as full_name , 
-- salary , 
-- salary*12 as annual_salary  from employees ; 
-----------------------------------------------------------------------
-- distnct  
-- select distinct dept_id from employees ; 

-- one column between multible select 

-- select distinct on (dept_id) dept_id , first_name , last_name , salary from employees ;

---------------------------------------------------------------
-- select * from employees where emp_id = 1 ;  

-- select * from employees where is_active = true ;  

---------------------------------------------------------------
-- and , or , not  : 

-- select * from employees where dept_id =1  and  salary > 80000;  

-- select * from employees where dept_id =1 or  salary > 80000;  

-- select * from employees where not dept_id =1  ;  
---------------------------------------------------------------
-- between :  

-- select * from employees where salary between 75000 and 100000 ; 
---------------------------------------------------------------
-- in / not in : 

-- select * from employees where dept_id in (1,3,5); -- 2,4 is not included 

-- select * from employees where dept_id not in (1,3,5);

---------------------------------------------------------------
-- like / ilike :
/*
like 'a%'     a yes but A is no 
ilike 'a%'    a yes also A is yes 
*/
/*
_ single char 
% mulitple chars 1 or more

*/
-- select * from employees where first_name like 'A%'        --all texts strats with A not a  


-- select * from employees where first_name like '%A'        --all texts ends with A not a 

-- select * from employees where first_name ilike 'A%'       --all texts strats with A or a 

-------------------------------------------------------
-- file includes some (like examples) : 

-- LIKE 'A%' 
-- LIKE '%.jpg'  
-- LIKE '%love%'  
-- LIKE 'A__'    
-- LIKE 'Room _0%'  
-- LIKE '[aeiou]%'     
-- LIKE '%[^aeiou]'     
-- LIKE '202[4-6]-%%'     تبدأ بـ 202 ثم 4 أو 5 أو 6 ثم شرطة ثم أي شيء (سنوات محددة 2024–2026)
-- LIKE '%[aeiou][^aeiou]%'    يحتوي على حرف علة متبوع مباشرة بحرف ساكن 
-- LIKE 'file[0-9][0-9].txt'          اسم ملف يبدأ بـ file ثم رقمين ثم .txt (مثل file01.txt, file99.txt)  
-- LIKE '%[a-z][A-Z]'                  يحتوي على حرف صغير متبوع مباشرة بحرف كبير في أي مكان  
-- LIKE '[A-Z][a-z][0-9]%'           يبدأ بحرف كبير ثم حرف صغير ثم رقم ثم أي شيء بعدها
-- LIKE '%[^0-9]%'                         يحتوي على حرف واحد على الأقل غير رقم (أي فيه حرف أو رمز)
-- LIKE '20__-%'                                 تبدأ بـ 20 ثم سنتين (أي رقمين) ثم شرطة ثم أي شيء بعدها  
-- LIKE '%@gmail.com'                           تنتهي بـ @gmail.com بالضبط

------------------------------------------------------
-- null / not null 
-- select * from employees where manager_id is null

-- select * from employees where manager_id is not  null 
------------------------------------------------------

-- order by  
-- select first_name , salary from employees order by salary desc ; 
-- select first_name , salary from employees order by salary ; -- asc 


-- list only first 3 
-- select first_name , salary from employees order by salary  limit 3; 


-- skip 2 rows , show  next 3 
-- select first_name , salary from employees order by salary  limit 3 offset 2 ; 


-- select * from employees order by emp_id fetch first 5 rows only ; 

-- select * from employees order by emp_id offset 2 rows fetch next 3 rows only ; 
---------------------------------------------------------------------------------
-- agg  
-- select min(salary) as min_saLary , 
--  max(salary) as max_saLary , 
--  sum(salary) as sum_saLary , 
--  avg(salary) as avg_saLary , 
--  count(salary) as count_saLary 
-- from employees ;

-- search round(val , 2) 
---------------------------------------------------------------------------------
-- group by : 

-- select dept_id , count(*) as head_count ,avg(salary) as avg_s
-- from employees group by dept_id  order by dept_id ; 


-- -- haviing  (fiteration) 


-- -- HAVING filters groups (like WHERE for aggregates)
-- -- Find departments with a sufficient number of employees (>=2) and high average salaries (>75,000).

-- SELECT dept_id, COUNT(*) AS headcount, AVG(salary) AS avg_sal
-- FROM employees
-- GROUP BY dept_id
-- HAVING COUNT(*) >= 2 AND AVG(salary) > 75000

---------------------------------------------------------------------------------
-- where & having : 
-- can i use where insted having ??? 
---------------------------------------------------------------------------------
-- JOINS  : 
/*
1. inner join        >> matched between two tables  
2. left join         >> matched + all in left 
3. right join        >> matched + all in right   
4. full outer join   >> all courses + all students 
5. cross join        >> carizian product  
6. self join         >> table joined itself 
*/
-- set some examples ..........................

-- INNER JOIN
-- -- Employees with their department names
-- SELECT e.emp_id, e.first_name, e.last_name,
--        d.dept_name, e.salary
-- FROM employees e
-- INNER JOIN departments d ON e.dept_id = d.dept_id
-- ORDER BY d.dept_name, e.last_name;
-- LEFT JOIN
-- -- All departments, including those with no employees
-- SELECT d.dept_name, e.first_name, e.salary
-- FROM departments d
-- LEFT JOIN employees e ON d.dept_id = e.dept_id
-- ORDER BY d.dept_name;

-- -- Find departments with NO employees
-- SELECT d.dept_id, d.dept_name
-- FROM departments d
-- LEFT JOIN employees e ON d.dept_id = e.dept_id
-- WHERE e.emp_id IS NULL;
-- FULL OUTER JOIN
-- -- All employees and all departments
-- SELECT e.first_name, d.dept_name
-- FROM employees e
-- FULL OUTER JOIN departments d ON e.dept_id = d.dept_id;
-- SELF JOIN
-- -- Employees with their manager names
-- SELECT e.first_name || ' ' || e.last_name AS employee,
--        m.first_name || ' ' || m.last_name AS manager
-- FROM employees e
-- LEFT JOIN employees m ON e.manager_id = m.emp_id
-- ORDER BY manager NULLS LAST;
-- CROSS JOIN
-- -- Generates all dept-project combinations (careful: can be huge!)
-- SELECT d.dept_name, p.project_name
-- FROM departments d
-- CROSS JOIN projects p
-- LIMIT 20;


-------------------------------------------------------------------
-- subquery  : 
-- select first_name , salary ,(select avg(salary) from employees as avg_s ) from employees ; 

-- I can add some examples ......................
-- SELECT first_name, last_name, salary
-- FROM employees
-- WHERE salary > (SELECT AVG(salary) FROM employees);


-------------------------------------------------------------------
-- union & union all 
-- union use distinct 

-- select emp_id , first_name , 'engineering' as reason 
-- from employees 
-- where dept_id = 1 

-- union 

-- select emp_id , first_name , 'high_earner' 
-- from employees 
-- where salary > 100000 
-- order by first_name ; 


-------------------------------------------------

-- -- List all dept names and all project names in one column
-- SELECT dept_name AS name, 'Department' AS type FROM departments
-- UNION ALL
-- SELECT project_name, 'Project'      FROM projects
-- ORDER BY type, name;


















































































