use Company_SD
--1

select d.Dependent_name , d.Sex 
from Employee e inner join Dependent d
on e.SSN=d.ESSN
where d.Sex = 'F' and e.Sex = 'F'
union
select d.Dependent_name , d.Sex 
from Employee e inner join Dependent d
on e.SSN=d.ESSN
where d.Sex = 'M' and e.Sex = 'M'

--2

SELECT p.Pname ,sum(w.Hours) as Total_Hour_Per_Project
FROM Works_for w inner join Project p 
on p.Pnumber= w.Pno
group by p.Pname 

--3
select Departments.*
from Employee inner join Departments 
on Employee.Dno = Departments.Dnum
where SSN=(select min(SSN) from Employee)

--4
select d.Dname , max(e.Salary) as maxS , min(e.Salary) as minS ,AVG(ISNULL(e.Salary,0)) AS AVGS 
from Employee e inner join Departments d
on e.Dno = d.Dnum
group by d.Dname

--5
SELECT *
FROM Employee e inner join Departments d
on e.SSN = d.MGRSSN 
left outer join Dependent 
on e.SSN = Dependent.ESSN
where Dependent.ESSN is null

--6

select d.Dnum  ,d.Dname , count(e.SSN) as num_Of_Emp, AVG(ISNULL(e.Salary,0)) as avg
from Employee e inner join Departments d
on e.Dno =d.Dnum
group by d.Dnum ,d.Dname
having AVG(ISNULL(e.Salary,0)) < (select AVG(ISNULL(Salary,0))
									from Employee)


--7
--kda lw f emp f dep w el dep dah feh aktar mn Project hyb2a hwa kman tb3 el projects deh w hwa m4 fehom 
SELECT e.Fname, e.Lname, p.Pname, d.Dnum
from Employee e	
inner join Departments d on e.Dno = d.Dnum 
inner join Project p on p.Dnum = d.Dnum
ORDER BY d.Dnum, e.Lname, e.Fname;

-- another solution
SELECT e.Fname, e.Lname, p.Pname, d.Dnum
FROM Employee e
INNER JOIN Works_for w ON e.SSN = w.ESSn
INNER JOIN Project p ON w.Pno = p.Pnumber
INNER JOIN Departments d ON p.Dnum = d.Dnum
ORDER BY d.Dnum, e.Lname, e.Fname

--8
select emp.Salary 
from (select top 2 *
				from Employee
				order by Salary desc ,SSN ) as emp
--9
select fname+' '+lname as [Full name]
from Employee 
where fname+' '+lname  in (select Dependent.Dependent_name
							  from Dependent)

--10
SELECT e.ssn, e.fname, e.lname
FROM employee e
WHERE EXISTS (
    SELECT 1
    FROM dependent
	where e.SSN=Dependent.ESSN
);

--11

insert into Departments (Dname,Dnum,MGRSSN,[MGRStart Date])
values('DEPT IT' ,100,112233,'1-11-2006')

select * from Departments

--12
update Departments set MGRSSN =968574 where Dnum=100
update Departments set MGRSSN =102672  where Dnum =20
update Employee set Superssn =102672 where SSN =102660 

--13

DELETE FROM Dependent WHERE ESSN = 223344;
UPDATE Departments SET MgrSSN = NULL WHERE MgrSSN = 223344;
UPDATE Employee SET SuperSSN = NULL WHERE SuperSSN = 223344;
DELETE FROM Works_for WHERE ESSN = 223344;
DELETE FROM Employee WHERE SSN = 223344;
	
--14
update Employee
set Salary=Salary+(Salary*.3)
where SSN in (select ESSn
			  from Works_for inner join Project
			   on Pno = Pnumber 
			   where Pname = 'Al Rabwah')
