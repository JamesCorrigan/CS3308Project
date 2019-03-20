CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(355) UNIQUE NOT NULL,
  password VARCHAR(355) NOT NULL,
  created DATE NOT NULL,
  family integer NOT NULL,
  parent boolean NOT NULL
);

CREATE TABLE families (
  id serial PRIMARY KEY,
  last_name VARCHAR(100) NOT NULL,
  images text[],
  members text[],
  calendar jsonb
);

psql -d api -U james;

INSERT INTO families (last_name, images, members, calendar)
VALUES ('smith', '{/images/1/img.jpg, /images/1/img2.jpg}', '{bill, joe, mary}', '{}');

INSERT INTO users (first_name, last_name, email, password, created, modified, family, parent)
VALUES ('bill', 'smith', 'bill@smith.com', 'password', now(), now(), 1, true);

INSERT INTO users (first_name, last_name, email, password, created, modified, family, parent)
VALUES ('joe', 'smith', 'joe@smith.com', 'password', now(), now(), 1, true);

INSERT INTO users (first_name, last_name, email, password, created, modified, family, parent)
VALUES ('mary', 'smith', 'mary@smith.com', 'password', now(), now(), 1, true);
