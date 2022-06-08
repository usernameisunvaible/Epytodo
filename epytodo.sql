
DROP DATABASE IF EXISTS epytodo ;
CREATE DATABASE epytodo;
USE epytodo;
CREATE TABLE user (id int unsigned not null auto_increment,
                   email varchar(50) not null,
                   password varchar(100) not null,
                   created_at varchar(25) not null,
                   firstname varchar(50) not null,
                   name varchar(50) not null,
                   PRIMARY KEY (id));

CREATE TABLE todo (id int unsigned not null auto_increment,
                   title varchar(50) not null,
                   description varchar(500) not null,
                   created_at varchar(25) not null,
                   due_time varchar(25) not null,
                   user_id int unsigned not null,
                   status varchar(20) not null, 
                   PRIMARY KEY (id));

ALTER TABLE todo
    ADD CONSTRAINT uuser_id FOREIGN KEY (user_id) REFERENCES user(id);
COMMIT;
