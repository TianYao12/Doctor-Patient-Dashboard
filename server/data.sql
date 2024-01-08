CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

create table users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

ALTER TABLE users
ADD COLUMN role VARCHAR(255) DEFAULT 'patient';

ALTER TABLE users
ADD COLUMN requested VARCHAR(255) DEFAULT 'no';