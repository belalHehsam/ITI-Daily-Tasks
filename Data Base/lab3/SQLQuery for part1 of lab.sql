use Company_SD

select * from Employee

select * from Departments

select * from Dependent

select * from Works_for
select * from Project


--1

select d.Dnum ,d.Dname ,d.MGRSSN as MGRSSN , e.Fname as MGRNAME
from Departments d inner join Employee e
on d.MGRSSN= e.SSN

--2

SELECT d.Dname , p.Pname
FROM Departments d inner join Project p
on d.Dnum=p.Dnum

--3
Select d.* , e.Fname +' '+ e.Lname as [FULL NAME]
FROM Employee e inner join Dependent d
on e.SSN=d.ESSN


--4
SELECT Pnumber,Pname,Plocation
FROM Project 
where City in ('cairo','alex')

--5
SELECT Project.*
from Project
where Pname like 'a%'

--6
Select Fname +' '+Lname as Full_NAME
FROM Employee 
where Dno =30 and Salary between 1000 and 2000

--7

SELECT e.Fname 
FROM Employee e inner join Works_for w
on e.SSN=w.ESSn
inner join Project p
on p.Pnumber=w.Pno
where e.Dno=10 and w.Hours >=10 and p.Pname= 'AL Rabwah'


--8
Select e.Fname +' '+e.Lname as[full name]
from Employee e inner join Employee s
on s.SSN=e.Superssn and s.Fname +' ' +s.Lname ='kamel mohamed'


--9
SELECT e.Fname , p.Pname
FROM Employee e inner join Works_for w
on e.SSN = w.ESSn
inner join Project p
on p.Pnumber= w.Pno
order by p.Pname

--10
Select p.Pnumber,d.Dname,e.Lname,e.Address,e.Bdate
FROM Project p inner join Departments d
on p.Dnum= d.Dnum
inner join Employee e
on d.MGRSSN=e.SSN
where p.City='cairo'

--11
SELECT e.*
FROM Employee e inner join Departments d
on e.SSN =d.MGRSSN

--12
Select Fname 
from Employee left outer join Dependent
on SSN= ESSN

--13

insert into Employee (Fname,Lname,SSN,Dno,Superssn,Salary)
values('belal','hesham',102672,30,112233,30000)

--14

insert into Employee (Fname,Lname,SSN,Dno)
values('ammar','mohamed',102660,30)

--15

update Employee
set Salary=Salary+(Salary*.2)
where SSN=102672