# CS3308Project
Group Project for CSCI 3308

DATABASE SETUP (WINDOWS):

1. DOWNLOAD THIS:
https://www.postgresql.org/download/windows/
2. TYPE IN TERMINAL:
psql postgres;
3. IN POSTGRES:
postgres=# CREATE ROLE james WITH LOGIN PASSWORD 'password';
postgres=# \q
4. IN TERMINAL:
psql -d postgres -U james
5. IN POSTGRES:
postgres=> CREATE DATABASE api;
postgres=> \c api
6. CREATE TABLES IN API DATABASE:

api=> CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(355) UNIQUE NOT NULL,
  password VARCHAR(355) NOT NULL,
  created DATE NOT NULL,
  family integer NOT NULL,
  parent boolean NOT NULL
);

api=> CREATE TABLE families (
  id serial PRIMARY KEY,
  last_name VARCHAR(100) NOT NULL,
  images text[],
  members jsonb,
  calendar jsonb
);




POSTGRESQL DATABASE STRUCTURE:
  users:
    id | first_name | last_name |     email      | password |  created   | family | parent
   ----+------------+-----------+----------------+----------+------------+--------+--------
     1 | bill       | smith     | bill@smith.com | password | 2019-03-19 |      1 | t
     3 | mary       | smith     | mary@smith.com | password | 2019-03-19 |      1 | t
     2 | joe        | smith     | joe@smith.com  | password | 2019-03-19 |      1 | f
  families:
  id | last_name |                 images                 |                      members                       | calendar
----+-----------+----------------------------------------+----------------------------------------------------+----------
   1 | smith     | {/images/1/img.jpg,/images/1/img2.jpg} | {"parents": ["bill", "mary"], "children": ["joe"]} | {}


Docs:
  Backend:
    https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8
  React:
    https://reactjs.org/docs/
    //More
  Redux:
    https://redux.js.org/introduction/getting-started
    //More
    Redux and Websocket:
      https://medium.com/@ianovenden/redux-websocket-integration-c1a0d22d3189
  React-Router:
    https://reacttraining.com/react-router/web/guides/quick-start
    //More
  NPM:
    https://docs.npmjs.com/
