create table schools
(
    id           serial
        constraint schools_pkey
            primary key,
    schoolname   varchar,
    address      varchar,
    profileimage text
);

alter table schools
    owner to postgres;

create table department
(
    id   serial
        constraint department_pkey
            primary key,
    name varchar
);

alter table department
    owner to postgres;

create table parents
(
    id           serial
        constraint parents_pkey
            primary key,
    profileimage text,
    userid       varchar(255),
    password     varchar(255),
    type         integer,
    name         varchar,
    lastname     varchar,
    address      varchar
);

alter table parents
    owner to postgres;

create table employees
(
    id           serial
        constraint employees_pkey
            primary key,
    schoolid     integer
        constraint employees_schoolid_fkey
            references schools,
    departmentid integer
        constraint employees_departmentid_fkey
            references department,
    userid       varchar(255),
    password     varchar(255),
    type         integer,
    name         varchar,
    lastname     varchar,
    profileimage text,
    address      varchar,
    isadmin      boolean default false,
    salary       integer,
    salarytype   varchar,
    dob          date
);

alter table employees
    owner to postgres;

create table hostels
(
    id       serial
        constraint hostels_pkey
            primary key,
    schoolid integer
        constraint hostels_schoolid_fkey
            references schools,
    name     varchar,
    address  varchar
);

alter table hostels
    owner to postgres;

create table hostelroom
(
    id          serial
        constraint hostelroom_pkey
            primary key,
    hostelid    integer
        constraint hostelroom_hostelid_fkey
            references hostels,
    floornumber integer,
    roomnumber  varchar
);

alter table hostelroom
    owner to postgres;

create table grade
(
    id          serial
        constraint grade_pkey
            primary key,
    gradenumber varchar
);

alter table grade
    owner to postgres;

create table teachers
(
    id           serial
        constraint teachers_pkey
            primary key,
    schoolid     integer
        constraint teachers_schoolid_fkey
            references schools,
    departmentid integer
        constraint teachers_departmentid_fkey
            references department,
    userid       varchar(255),
    password     varchar(255),
    type         integer,
    name         varchar,
    lastname     varchar,
    profileimage text,
    address      varchar,
    salary       integer,
    salarytype   varchar,
    dob          date,
    gradeid      integer
        constraint teachers_grade_id_fk
            references grade
);

alter table teachers
    owner to postgres;

create table employeesattendance
(
    id         serial
        constraint employeesattendance_pkey
            primary key,
    employeeid integer
        constraint employeesattendance_employeeid_fkey
            references employees,
    teacherid  integer
        constraint employeesattendance_teacherid_fkey
            references teachers,
    adate      timestamp,
    present    boolean
);

alter table employeesattendance
    owner to postgres;

create table students
(
    id           serial
        constraint students_pkey
            primary key,
    schoolid     integer
        constraint students_schoolid_fkey
            references schools,
    parentid     integer
        constraint students_parentid_fkey
            references parents,
    userid       varchar(255),
    password     varchar(255),
    type         integer,
    name         varchar,
    lastname     varchar,
    profileimage text,
    address      varchar,
    gradeid      integer
        constraint students_grade__fk
            references grade,
    datejoined   date,
    gender       varchar,
    dob          date,
    new          boolean default true
);

alter table students
    owner to postgres;

create table inhostel
(
    id         serial
        constraint inhostel_pkey
            primary key,
    hostelid   integer
        constraint inhostel_hostelid_fkey
            references hostels,
    studentid  integer
        constraint inhostel_studentid_fkey
            references students,
    teacherid  integer
        constraint inhostel_teacherid_fkey
            references teachers,
    employeeid integer
        constraint inhostel_employeeid_fkey
            references employees,
    startdate  timestamp,
    enddate    timestamp
);

alter table inhostel
    owner to postgres;

create table classes
(
    id        serial
        constraint classes_pkey
            primary key,
    schoolid  integer
        constraint classes_schooid_fkey
            references schools,
    gradeid   integer
        constraint classes_gradeid_fkey
            references grade,
    classname varchar
);

alter table classes
    owner to postgres;

create table classroom
(
    id         serial
        constraint classroom_pkey
            primary key,
    roomnumber varchar
);

alter table classroom
    owner to postgres;

create table subjects
(
    id      serial
        constraint subjects_pkey
            primary key,
    name    varchar,
    gradeid integer
        constraint subjects_grade_id_fk
            references grade
            on delete cascade,
    active  boolean default true
);

alter table subjects
    owner to postgres;

create table subjectresourcestype
(
    id   serial
        constraint subjectresourcestype_pkey
            primary key,
    name varchar
);

alter table subjectresourcestype
    owner to postgres;

create table subjectresources
(
    id                     serial
        constraint subjectresources_pkey
            primary key,
    subjectid              integer
        constraint subjectresources_subjectid_fkey
            references subjects,
    subjectresourcestypeid integer
        constraint subjectresources_subjectresourcestypeid_fkey
            references subjectresourcestype,
    name                   varchar,
    location               text,
    dateadded              timestamp
);

alter table subjectresources
    owner to postgres;

create table timetable
(
    id        serial
        constraint timetable_pkey
            primary key,
    subjectid integer
        constraint timetable_subjectid_fkey
            references subjects,
    classdate timestamp
);

alter table timetable
    owner to postgres;

create table examinationtimetable
(
    id        serial
        constraint examinationtimetable_pkey
            primary key,
    subjectid integer
        constraint examinationtimetable_subjectid_fkey
            references subjects,
    examdate  timestamp
);

alter table examinationtimetable
    owner to postgres;

create table library
(
    id       serial
        constraint library_pkey
            primary key,
    schoolid integer
        constraint library_schoolid_fkey
            references schools,
    name     varchar
);

alter table library
    owner to postgres;

create table bookauthors
(
    id   serial
        constraint bookauthors_pkey
            primary key,
    name varchar
);

alter table bookauthors
    owner to postgres;

create table books
(
    id            serial
        constraint books_pkey
            primary key,
    libraryid     integer
        constraint books_libraryid_fkey
            references library,
    name          varchar,
    s_number      varchar,
    publisher     varchar,
    datepublished timestamp,
    authorid      integer not null
        constraint author___fk
            references bookauthors
);

alter table books
    owner to postgres;

create table bookstakenby
(
    id         serial
        constraint bookstakenby_pkey
            primary key,
    bookid     integer
        constraint bookstakenby_bookid_fkey
            references books,
    studentid  integer
        constraint bookstakenby_studentid_fkey
            references students,
    teacherid  integer
        constraint bookstakenby_teacherid_fkey
            references teachers,
    datetaken  timestamp not null,
    returndate timestamp not null
);

alter table bookstakenby
    owner to postgres;

create table emergencymembers
(
    id           serial
        constraint emergencymembers_pkey
            primary key,
    studentid    integer
        constraint emergencymembers_studentid_fkey
            references students,
    teacherid    integer
        constraint emergencymembers_teacherid_fkey
            references teachers,
    employeeid   integer
        constraint emergencymembers_employeeid_fkey
            references employees,
    name         varchar,
    phonenumber  varchar,
    relationship varchar
);

alter table emergencymembers
    owner to postgres;

create table posts
(
    id         serial
        constraint posts_pkey
            primary key,
    schoolid   integer
        constraint posts_schoolid_fkey
            references schools,
    body       text,
    dateposted timestamp
);

alter table posts
    owner to postgres;

create table event
(
    id        serial
        constraint event_pkey
            primary key,
    schoolid  integer
        constraint event_schoolid_fkey
            references schools,
    body      text,
    starttime timestamp not null,
    endtime   timestamp
);

alter table event
    owner to postgres;

create table feetype
(
    id      serial
        constraint feetype_pkey
            primary key,
    feetype varchar
);

alter table feetype
    owner to postgres;

create table installment
(
    id                serial
        constraint installment_pkey
            primary key,
    installmentnumber integer
);

alter table installment
    owner to postgres;

create table fee
(
    id                  serial
        constraint fee_pkey
            primary key,
    feetypeid           integer
        constraint fee_feetypeid_fkey
            references feetype,
    installmentnumberid integer
        constraint fee_installmentnumberid_fkey
            references installment,
    studentid           integer
        constraint fee_studentid_fkey
            references students,
    amount              integer,
    duedate             timestamp,
    paymenttype         varchar,
    currency            varchar
);

alter table fee
    owner to postgres;

create table salarytype
(
    id   serial
        constraint salarytype_pkey
            primary key,
    type varchar
);

alter table salarytype
    owner to postgres;

create table employeesalary
(
    id           serial
        constraint employeesalary_pkey
            primary key,
    employeeid   integer
        constraint employeesalary_employeeid_fkey
            references employees,
    teacherid    integer
        constraint employeesalary_teacherid_fkey
            references teachers,
    salarytypeid integer
        constraint employeesalary_salarytypeid_fkey
            references salarytype,
    amount       integer,
    currency     varchar
);

alter table employeesalary
    owner to postgres;

create table salarypaid
(
    id         serial
        constraint salarypaid_pkey
            primary key,
    employeeid integer
        constraint salarypaid_employeeid_fkey
            references employees,
    teacherid  integer
        constraint salarypaid_teacherid_fkey
            references teachers,
    amountpaid integer,
    datepaid   timestamp,
    currency   varchar
);

alter table salarypaid
    owner to postgres;

create table salarytobepaid
(
    id         serial
        constraint salarytobepaid_pkey
            primary key,
    employeeid integer
        constraint salarytobepaid_employeeid_fkey
            references employees,
    teacherid  integer
        constraint salarytobepaid_teacherid_fkey
            references teachers,
    fordate    timestamp,
    amount     integer,
    currency   varchar
);

alter table salarytobepaid
    owner to postgres;

create table tokens
(
    id    serial
        constraint tokens_pkey
            primary key,
    token varchar(255),
    type  integer
);

alter table tokens
    owner to postgres;

create table starttime
(
    id           serial
        constraint starttime_pk
            primary key,
    stime        text,
    timeoftheday text
);

alter table starttime
    owner to postgres;

create table endtime
(
    id           serial
        constraint endtime_pk
            primary key,
    etime        text,
    timeoftheday text
);

alter table endtime
    owner to postgres;

create table subjects_thought_by_teachers
(
    id          serial
        constraint subjects_thought_by_teachers_pk
            primary key,
    subjectid   integer not null
        constraint subjects_thought_by_teachers_subjects_id_fk
            references subjects,
    teacherid   integer not null
        constraint subjects_thought_by_teachers_teachers_id_fk
            references teachers,
    classroomid integer not null
        constraint subjects_thought_by_teachers_classroom_id_fk
            references classroom,
    active      boolean default true,
    ended       boolean default false,
    start       integer not null
        constraint subjects_thought_by_teachers_starttime_id_fk
            references starttime,
    "end"       integer not null
        constraint subjects_thought_by_teachers_endtime_id_fk
            references endtime,
    time        text    not null
);

alter table subjects_thought_by_teachers
    owner to postgres;

create table subjectselected
(
    id           serial
        constraint subjectselected_pkey
            primary key,
    studentid    integer
        constraint subjectselected_studentid_fkey
            references students,
    subjectid    integer
        constraint subjectselected_subjectid_fkey
            references subjects_thought_by_teachers,
    dateselected timestamp,
    active       boolean default true not null
);

alter table subjectselected
    owner to postgres;

create table studentsattendance
(
    id        serial
        constraint studentsattendance_pkey
            primary key,
    studentid integer
        constraint studentsattendance_studentid_fkey
            references students,
    adate     timestamp,
    present   boolean,
    subjectid integer not null
        constraint subjectselected__fk
            references subjectselected
);

alter table studentsattendance
    owner to postgres;

create table marks
(
    id                serial
        constraint marks_pkey
            primary key,
    subjectselectedid integer
        constraint marks_subjectselectedid_fkey
            references subjectselected,
    fscore            integer,
    sscore            integer,
    totalscore        integer
);

alter table marks
    owner to postgres;

create table allowselection
(
    id    serial
        constraint allowselection_pkey
            primary key,
    allow boolean default false
);

alter table allowselection
    owner to postgres;

create table gradeupdates
(
    id   serial
        constraint gradeupdates_pk
            primary key,
    year date default now() not null
);

alter table gradeupdates
    owner to postgres;

