## Templating:

1. EJS
   - syntax  example: <p><%= name %> </p>  
   - plain html with inject js code
   - use in express by using ejs-locals middleware
   - have layouts, cli, 

2. Pug
   - syntax example: p #{name} 
   - custom template lang

3. Handlebars  (similar to twig)
   - syntax example: <p>{{name}}</p>
   - easy register helpers (functions, filters, partials)
   - don't support conditions, only true/false
   - don't support loops, only each


4. Nunjacks (most similar to twig)
   - syntax example: {{#each users}}<li>{{name}}</li>{{/each}}
   - filters out of the box {{ foo | replace("foo", "bar") | capitalize }}
   - layouting
   - good documented
  

## SQL 
   Working with SQL in node.js

   Main differnce that is not working via single connection, but with pool of connections.
   
   1. mysql2
      - mysql2 is a MySQL client for Node.js that supports both promise-based API and callback API.
      - It also supports prepared statements, which can help prevent SQL injection attacks.

   2. Sequelize (ORM)
      - ORM is a layer between your app and the database, it abstracts away the details of how to interact with the database.
      - Sequelize is an ORM for Postgres, MySQL, SQLite and MSSQL.
      - Sequelize supports both promise-based API and callback API.
   3. Knex (ORM)
      - Knex is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift.
      - Knex is designed to be flexible and modular, so you can easily swap out different database engines without changing your code.
   4. Bookshelf (ORM)
      - Bookshelf is a lightweight ORM for Node.js that provides a simple interface for interacting with databases.
      - It's built on top of the Knex query builder, so it inherits its features and performance.
   5. Waterline (ORM)
      - Waterline is an Object-Relational Mapping (ORM) tool for Node.js that allows you to interact with your