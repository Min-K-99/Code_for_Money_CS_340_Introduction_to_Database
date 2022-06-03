-- CONTACT
DROP TABLE IF EXISTS  contact ;
CREATE TABLE contact( 
    contact_id INT(15) NOT NULL AUTO_INCREMENT UNIQUE, 
    fst_name varchar(200) NOT NULL,
    lst_name varchar(200), 
    sex varchar(20), 
    dob DATE, 
    phone_number INT(15), 
    address varchar(255), 
    email varchar(255), 
    bid INT(15) NOT NULL UNIQUE,
    PRIMARY KEY (contact_id)
)ENGINE=InnoDB;

LOCK TABLES contact WRITE;
INSERT INTO contact 
VALUES
    (1,'Code For Money' , NULL, NULL,  '2002-03-01' , 1234567890,  'Somewhere in US' ,  'codeformoney@codeformoney.com', 1),
    (2, 'Human Resources' , NULL, NULL,  '2002-03-01' , 2234567890,  'Somewhere In US' ,  'humanresouce@codeformoney.com',2),
    (3, 'Marketing' , NULL, NULL,  '2002-03-01' , 3234567890, 'Somewhere In US', 'marketing@codeformoney.com',3),
    (4, 'Finance' , NULL, NULL,  '2002-03-01' , 4234567890,  'Somewhere In US' ,  'finance@codeformoeny.com',4),
    (5, 'Tun Aung', 'Thaung' , 'male' , '2000-01-03' , 9999999999,  'Ayeyarwady Kyouttone' ,  'project@codeformoney.com',5),
    (6, 'Alex' , 'Yu' , 'male' , '2001-04-02' , 8888888888,  'NW CandyHouse Steak City' ,  'mediumrare@codeformoney.com',6),
    (7, 'Min Khant ', 'Aung' ,  'male' ,  '2000-04-20' , 7777777777,  '183 Htaminpaung, Shankhoutswal City' , 'htaminpaung@codeformoney.com',7);
UNLOCK TABLES;

-- BRANCH
DROP TABLE IF EXISTS  branch ;
CREATE TABLE branch( 
    branch_id INT(15) NOT NULL AUTO_INCREMENT UNIQUE, 
    branch_type varchar(30), 
    cid INT(15) NOT NULL UNIQUE, 
    CONSTRAINT pk_branch PRIMARY KEY (branch_id), 
    CONSTRAINT fk_contact
    FOREIGN KEY (cid) REFERENCES contact(contact_id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
)ENGINE=InnoDB;

LOCK TABLES  branch  WRITE;
INSERT INTO  branch 
VALUES
    (1, 'Company', 1),
    (2, 'Human Resources', 2),
    (3, 'Marketing', 3),
    (4, 'Finance', 4);
UNLOCK TABLES;

SET FOREIGN_KEY_CHECKS=0;
ALTER TABLE contact
ADD CONSTRAINT fk_branch
FOREIGN KEY (bid) REFERENCES branch(branch_id);

-- Company
DROP TABLE IF EXISTS company;
CREATE TABLE company( 
    company_name varchar(30) UNIQUE NOT NULL, 
    bid INT(15) NOT NULL UNIQUE, 
    cid INT(15) NOT NULL UNIQUE, 
    FOREIGN KEY (bid) REFERENCES branch(branch_id),
    FOREIGN KEY (cid) REFERENCES contact(contact_id) 
)ENGINE=InnoDB;

LOCK TABLES `company` WRITE;
INSERT INTO `company` 
VALUES 
    ('Code for Money', 1, 1);
UNLOCK TABLES;

--HR
DROP TABLE IF EXISTS hr;
CREATE TABLE hr(
    employee_id INT(15) NOT NULL UNIQUE PRIMARY KEY,
    fst_name varchar(200),
    lst_name varchar(200), 
    bid INT(15) NOT NULL UNIQUE,
    cid INT(15) NOT NULL UNIQUE,
    FOREIGN KEY (bid) REFERENCES branch(branch_id),
    FOREIGN KEY (cid) REFERENCES contact(contact_id) 
)ENGINE=InnoDB;

LOCK TABLES `hr` WRITE;
INSERT INTO `hr` 
VALUES 
    (1, 'Tun Aung', 'Thaung', 2, 5);
UNLOCK TABLES;

-- Marketing
DROP TABLE IF EXISTS marketing;
CREATE TABLE marketing(
    employee_id INT(15) NOT NULL UNIQUE PRIMARY KEY,
    fst_name varchar(200),
    lst_name varchar(200), 
    bid INT(15) NOT NULL UNIQUE,
    cid INT(15) NOT NULL UNIQUE,
    FOREIGN KEY (bid) REFERENCES branch(branch_id),
    FOREIGN KEY (cid) REFERENCES contact(contact_id) 
)ENGINE=InnoDB;

LOCK TABLES `marketing` WRITE;
INSERT INTO `marketing` 
VALUES 
    (1, 'Alex', 'Yu', 3, 6);
UNLOCK TABLES;

-- Finance
DROP TABLE IF EXISTS finance;
CREATE TABLE finance(
    employee_id INT(15) NOT NULL UNIQUE PRIMARY KEY,
    fst_name varchar(200),
    lst_name varchar(200), 
    bid INT(15) NOT NULL UNIQUE,
    cid INT(15) NOT NULL UNIQUE,
    FOREIGN KEY (bid) REFERENCES branch(branch_id),
    FOREIGN KEY (cid) REFERENCES contact(contact_id) 
)ENGINE=InnoDB;

LOCK TABLES `finance` WRITE;
INSERT INTO `finance` 
VALUES 
    (1, 'Min Khant', 'Aung', 4, 7);
UNLOCK TABLES;


-- DISPLAY
DESCRIBE company;
DESCRIBE branch;
DESCRIBE contact;
DESCRIBE hr;
DESCRIBE marketing;
DESCRIBE finance;

select * from contact;
select * from branch;
select * from company;
select * from hr;
select * from marketing;
select * from finance;