# CS3308Project
Family Time: A family Planning Website.


Organize and gather a busy family for much-needed ‘Family Time’. Share Photos,
Schedule Meals, and Plan Vacations as a family!


Project By James Corrigan, Josef May, Kara Metcalfe, Niko Senkov, Ahoto Obika and Jiheng Zhao.


REPO STRUCTURE:
-The React Site is in the UI folder, with most of the components in the src/components folder. The backend code is all held in API/index.js and API/queries.js 


DOCS:

1. React-Redux:
-https://react-redux.js.org/introduction/quick-start
2. React:
-https://reactjs.org/docs/getting-started.html
3. PostgreSQL
-https://www.postgresql.org/docs/


HOW TO START:
 To start the UI, type npm install, npm run build, and serve -s build inside the UI directory. to start the API, type npm install and npm start inside the API directory. For database setup, create a postgres user 'james' with the password 'password', and give the user CREATEDB permissions. Then, type "psql -d postgres -U james;" in a terminal. In the postgres terminal, type "CREATE DATABASE api;", "\c api", and then create the tables with the commands: 


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

and

CREATE TABLE families (
  id serial PRIMARY KEY,
  last_name VARCHAR(100) NOT NULL,
  images text[],
  members jsonb,
  calendar jsonb
);

