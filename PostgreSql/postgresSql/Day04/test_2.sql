create role read_only_group ; 
create role read_write_group ; 
create role admin_group ; 


grant select on all tables in schema public to read_only_group ; 


grant select , insert , update , delete  on all tables in schema public to read_write_group ; 


grant all privileges on all tables in schema public to admin_group ; 


------------------------------------------------------------
-- syntax 1 : 
create role app_user login password '123456' ; 

-- syntax 2  
create user report_user with password '1234';

-- syntax 3
create role api_user 
login 
password '1234'
connection limit 3 
valid until '2026-08-01'; ---- password valid to this date 

-- syntax 4  : 
create role DBA_user login password '1234' superuser ; ---- not recommended 



----------------------------------------------------
--  how add user to role : 
grant read_only_group to app_user ; 

grant read_write_group to report_user ; 

grant admin_group to DBA_user ;

----------------------------------------------------
-- how to remove privilages : 

revoke delete on employees from read_write_group ; 

revoke all privileges  on employees from  read_write_group ; 

----------------------------------------------------



































































