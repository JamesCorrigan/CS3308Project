# CS3308Project
Group Project for CSCI 3308

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
