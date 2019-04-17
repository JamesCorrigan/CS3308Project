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
  members jsonb,
  calendar jsonb
);



psql -d api -U james;

UPDATE families SET calendar = '[{"start": "2019-05-12", "end": "2019-05-16", "title": "test vacation"},{"start": "2019-04-12", "end": "2019-04-16", "title": "test vacation 2"}]' WHERE id = 20;

{"start": "2019-05-12", "end": "2019-05-16", "title": "test vacation"}, {"start": "2019-06-12", "end": "2019-06-16", "title": "test vacation2"}

INSERT INTO families (calendar) VALUES ('{"start": "2019-05-12", "end": "2019-05-16", "title": "test vacation"}');

INSERT INTO families (calendar) VALUES '{}' WHERE id = 20;

INSERT INTO families (last_name, images, members, calendar)
VALUES ('smith', '{/images/1/img.jpg, /images/1/img2.jpg}', '{"parents": ["bill", "mary"], "children": ["joe"]}', '{}');

INSERT INTO users (first_name, last_name, email, password, created, modified, family, parent)
VALUES ('bill', 'smith', 'bill@smith.com', 'password', now(), now(), 1, true);

INSERT INTO users (first_name, last_name, email, password, created, modified, family, parent)
VALUES ('joe', 'smith', 'joe@smith.com', 'password', now(), now(), 1, true);

INSERT INTO users (first_name, last_name, email, password, created, modified, family, parent)
VALUES ('mary', 'smith', 'mary@smith.com', 'password', now(), now(), 1, true);
