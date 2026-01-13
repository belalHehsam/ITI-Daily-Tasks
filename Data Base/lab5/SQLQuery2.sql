use AdventureWorks2012

select * from sales.SalesOrderHeader
--1
select s.SalesOrderID , s.ShipDate 
from Sales.SalesOrderHeader as s
where s.OrderDate between '7/28/2002' and  '7/29/2014'

--2
select p.Name , p.ProductID
from Production.Product as p
where p.StandardCost <110
--3
select * from Production.Product as p

select p.ProductID , p.Name 
from Production.Product as p
where p.Weight is null

--4
select p.Name , p.Color
from Production.Product as p
where p.Color in ('Black','Silver','Red')

--5
select p.Name
from Production.Product as p
where Name like 'B%'

--6
UPDATE Production.ProductDescription
SET Description = 'Chromoly steel_High of defects'
WHERE ProductDescriptionID = 3

select p.Description
from Production.ProductDescription as p
where p.Description like '%[_]%'

--7
select * from  Sales.SalesOrderHeader

select sum(s.TotalDue) as [sum ] ,s.OrderDate
from  Sales.SalesOrderHeader as s
where s.OrderDate between '7/1/2001' and '7/31/2014'
group by s.OrderDate

--8
select Distinct e.HireDate
from HumanResources.Employee as e

--9

select AVG(newtable.ListPrice)
from  (select distinct e.ListPrice from  Production.Product as e )  as newtable
--OR
select avg(distinct e.ListPrice) as [Avg]
from Production.Product as e

--10
select CONCAT('the',' ',e.Name,' ','is only',' ',e.ListPrice)
from  Production.Product as e 
where e.ListPrice between 100 and 120
order by e.ListPrice 

--11
select s.rowguid ,s.Name ,s.SalesPersonID ,s.Demographics into store_Archive
from Sales.Store as s 

select * from  store_Archive

--11 b
select s.rowguid ,s.Name ,s.SalesPersonID ,s.Demographics into store_Archive2
from Sales.Store as s 
where 1=2

--12
SELECT CONVERT(varchar, GETDATE(), 101) AS [Today’s Date in Style 101] 
UNION
SELECT CONVERT(varchar, GETDATE(), 103)



