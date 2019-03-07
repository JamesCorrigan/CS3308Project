CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(355) UNIQUE NOT NULL,
  created DATE NOT NULL,
  modified DATE NOT NULL
);
