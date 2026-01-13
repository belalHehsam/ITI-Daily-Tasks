use Company_SD
--1
select * from Employee

--2
select fname , lname, salary,Dno 
from Employee

--3
select pname , Plocation,Dnum 
from Project

--4
select Fname+' '+ lname as [Full Name] ,(salary *12*.10 )as[ANNUAL COMM]
from Employee

--5
select ssn ,fname,Salary
from Employee
where Salary >1000

--6
select ssn as [emp_Id] ,fname+' '+Lname as [Full Name] ,(Salary*12) as salary
from Employee
where Salary * 12 > 10000

--7
select fname ,salary 
from Employee
where Sex = 'F'

--8
select Dnum ,Dname 
from Departments
where MGRSSN =968574

--9
select Pnumber ,Pname , Plocation , Dnum
from Project
where Dnum=10
