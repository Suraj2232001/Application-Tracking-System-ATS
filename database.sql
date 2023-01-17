

insert into Candidate_Info values(6,'Nawaz','Resumes\Resume1.pdf','Service','Pune')



select * from Candidate_SignUp
delete from Candidate_SignUp where Cand_ID<=8 
delete from Candidate_Info where Cand_ID=6 
delete from Add_Jobs where Job_ID>1012

insert into Candidate_SignUp values('Suraj','admin','admin1@gmail.com','admin')
insert into Candidate_SignUp values('Vijay','admin','admin2@gmail.com','admin')

create table ShortlistedCandidate(CandID int identity(90001,1) primary key not null,
Resume_ID int references Candidate_Info(Resume_ID) not null,
Names varchar(50) not null,
ResumePath varchar(100) not null)

select * from ShortlistedCandidate

delete from ShortlistedCandidate where CandID>0


select * from Add_Jobs
select * from Candidate_Info
select * from Candidate_SignUp
select * from ShortlistedCandidate