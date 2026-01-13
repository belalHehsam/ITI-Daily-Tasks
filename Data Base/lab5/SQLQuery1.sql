use ITI

--1
select count(Student.St_Age)
from Student

--2
select Distinct  Ins_Name
from Instructor

--3

select s.St_Id ,ISNULL( s.St_Fname +' '+ s.St_Lname ,'unknown') as [full name] , d.Dept_Name
from Student s inner join Department d
on s.Dept_Id= d.Dept_Id

--4

select I.Ins_Name , d.Dept_Name
from Instructor I left outer join Department d
on I.Dept_Id = d.Dept_Id

--5
select s.St_Fname +' '+ s.St_Lname as[Full name] , c.Crs_Name
from Student s inner join Stud_Course sc
on s.St_Id = sc.St_Id
inner join Course c
on c.Crs_Id =sc.Crs_Id
where sc.Grade is not null

--6
select  count(c.Crs_Id)
from Course c inner join Topic t
on t.Top_Id=c.Top_Id
group by t.Top_Id

--7

select MAX(Salary) as maxSalary , MIN(Salary) as minSalary
from Instructor 

--8
select Ins_Name
from Instructor 
where Salary < (select AVG(ISNULL(Salary,0)) from Instructor)

--9
select Dept_Name
from Department d inner join Instructor i 
on d.Dept_Id = i.Dept_Id
where Salary = (select min(Salary)
				from Instructor )

--10
select Top(2) Salary
from Instructor
order by Salary desc

--11
select Ins_Name, coalesce(convert (nvarchar(20),Salary),'bouns')
from Instructor

--12
select AVG(ISNULL(Salary,0))
from Instructor

--13
select s.St_Fname as [Student NAME], superV.*
from Student s inner join Student superV
on superV.St_Id= s.St_super

--14

SELECT *
FROM (
    SELECT* 
        ,ROW_NUMBER() OVER (PARTITION BY Dept_ID ORDER BY Salary DESC) AS RowNum
    FROM Instructor
    WHERE Salary IS NOT NULL
) AS ranked
WHERE RowNum <= 2
ORDER BY Dept_Id, Salary DESC;

--15

SELECT *
FROM (
    SELECT *,ROW_NUMBER() OVER (PARTITION BY DEPT_ID ORDER BY NEWID()) AS RowNum
    FROM Student
) AS Randomized
WHERE RowNum = 1;




