<<<<<<< HEAD
ro-project-git
==============

ToDoList Application:
ToDoList Project Documentation:

Contents: 
1. The ToDoList Project Document.
2. The program itself stored in the file simple.js
3. The mysql data dump stored in the file mysqldump.2012.09.13.sql


Note: ->To execute the program type in "node simple.js" in the linux terminal after installing node.js, npm, express.js, mysql, db-mysql driver and other utilities related to node.
      -> simple.js is the filename of the program. 


Step1 : 
  Installed Node.js, npm and express.js as mentioned.

Step 2: 
   Installed other utilities and drivers such as db-mysql for the mysql database, installed mysql and connected as root creating a database named "project" with a table also named "project". The attributes of the table include :
     
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| task     | varchar(40) | NO   |     | NULL    |                |
| task_id  | int(11)     | NO   | PRI | NULL    | auto_increment |
| due_date | date        | YES  |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+

Step 3: 
   -> Created an express.js application
   -> The app.get('/',req,res) handler routes to  '/' through the url: http://127.0.0.1:3000/ with 127.0.0.1 referring to localhost and 3000 referring to the Port number.
   -> The purpose of this handler is to retrieve the page and display a form to "Create a Task" and render the "Pending tasks"(using HTML tables) on the page by querying the database through a select statement using the db-mysql driver api using a call back function(in order to execute the instructions in the order in which they are displayed in the program).
   -> If a task is past the due date, those tasks get highlighted with a red background.
   -> There are two app.post handlers(routes: app.post('/',req,res) and app.post('/test',req,res). Both of them get called from the app.get('/',req,res) handlers. 
   -> app.post('/',req,res):
  This handler receives the posted form entries to create a task through the "req.param" methods. Immediately after that a call back function is called to validate the presence of a task and to check to see if the date entered is a valid date or not. After this validation, an SQL query inserts data into the "project" table of the "project" database through the db-mysql driver execute method. Finally the new results are diplayed by doing a redirect on to the app.get "/" route which inturn calls the getResults call back function and queries the database with the most recent table values through the select SQL statement.
   -> app.post('/test',req,res) 
   Next, this app.post handler routes to "/test". This handler deletes a task based on the "task" attribute which is passed as a value using a checkbox option in the app.get('/',req,res) handler.

Step 4:
     A dump of the mysql database has been created with the name "mysqldump.2012.09.13.sql" in order to recreate the table and database used in the project to get the program running. 

NOTE: I have used a local version of mysql,node.js,npm, express.js framework and the tables and the database is also local to my system. In order to execute the program the environment for the running the program including the tables and database among others need to be recreated using the mysqldump file attached along with the rest of the documents. 
=======
ToDo
====
>>>>>>> e9445e327bf485679b6db8d747254846de308bd4
