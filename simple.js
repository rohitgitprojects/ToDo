var jade = require('jade');
var util = require('util');
var dialog = require('dialog');
var express = require("express");

// Create an Application with express.js
var app = express();
app.configure(function(){
	app.use(express.bodyParser());
});
app.use(express.logger());

// Declaration of Global variables
 var due_date = new Array();
 var arr = new Array();
 var  noInsert;
  var flag1=0;
  var length;
  var task;
  var date1;
  var date2;


//Call back function to render HTML content in the app.get function correctly.
function getResults( req, res, next) {
      //Select query for all pending tasks
                var mysql = require('db-mysql');
                new mysql.Database({
                        hostname: 'localhost',
                        user: 'root',
                        password: 'password',
                        database: 'project'
                        }).connect(function(error) {
                        if (error) {
                                return console.log('CONNECTION error: ' + error);
                                }


                 //Select all rows and display result.
                 this.query('SELECT * FROM ' + this.name('project')  + 'ORDER BY' + this.name('due_date')).
                 execute(function(error, rows, cols) {
                 if (error) {
                        console.log('ERROR: ' + error);
                        return;
                 }
                console.log(rows.length + ' ROWS found123 ');
                //Loop through the results from the query and assign to the arrays arr and due_date, the task and due dates from each row respectively.       
                for(i=0; i<rows.length; i++)      
                {

                   arr[i]= rows[i].task;
                   due_date[i]=rows[i].due_date;
                   console.log(rows[i].task);
                   console.log("arr[i]="+ arr[i]);
                }
                console.log("rows.length"+rows.length);
                length=rows.length;
                
                next(); 

  });
});
}


//ap.get method to Create Tasks, Display Pending Tasks and Delete tasks once they are completed clicking the done button.
app.get('/', getResults, function(req, res){
    
    //Form for Creating a task. 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Application to create a ToDoList<br><br><br>');
    res.write('<div style="width:1000px;height:150px;border:2px dotted black;">');
   

    res.write('<p>Create a new Task</p>');
    res.write('<form name="createTask" method="POST" action="/" onsubmit="return validateForm()" >');
    res.write('<p>Task');
    res.write('<input type="text" name="task">');
    res.write('&nbsp; &nbsp; &nbsp; &nbsp;');
    res.write('Due Date (format: mm/dd/yyyy)')
    res.write('<input type="text" name="date"></p><br>');
    res.write('<input type="submit" name="submit" value="Submit">');
    res.write('</form>');
    res.write('</div>');
    res.write('<br> <br> <br> <br> <br> <br> <br>');  
    res.write('<div style="width:1000px;border:2px dotted black;">');
   

    // Display pending tasks within a HTML table. 
    res.write('<p>Pending Tasks</p>');
   
    res.write('<table border="1" width="1000" height="200" cellpadding="25">');
    res.write('<tr> <td width=50%> Task List</td> <td width=20%> Due Date </td> <td width=30%> Check Box </td> <td width=20%> Done</td></tr>');
               
                for(var i=0; i<length; i++)
                {
                   res.write('<tr >');
                   var now = new Date();
                   var dateDb = new Date(due_date[i]);
                   console.log("Date now"+ now.getDate());

                   console.log("Date in db" + dateDb.getDate());
                   if(dateDb > now)
                   {
                          res.write('<td width=100% bgcolor="#FF0000">'+arr[i]+'</td>');
		          res.write('<td width=100% bgcolor="#FF0000">' + due_date[i] + '</td>');	 

                   }
                   else 
                   {
                         res.write('<td width=100%>'+arr[i]+'</td>');
                         res.write('<td width=100%>' + due_date[i] + '</td>');
                   }
                   res.write('<form name="createTask" method="POST" action="/test">')   
                   res.write('<td width=100%> <input type="checkbox" name = "taskdone" value="'+arr[i]+'" > </td>');
                   res.write('<td width=100%> <input type="submit" name="submit" value="Done"> </td>');
                   res.write('</form>');
                   res.write('</tr>');

                }
   res.write('</table>');
   res.end();
});

app.listen(3000);

// Function to validate Task and Date Input posted as parameters through the Create Task form. Implemented as a Call Back function to create correct ordering and execution of statements. 
  
function insertValidation (req, res, next) {

        console.log("task="+ task);
        var myDate = new Date(date1);
        date2    = myDate.getUTCFullYear() + '-' + ('00' + (myDate.getUTCMonth()+1)).slice(-2) + '-' + myDate.getUTCDate() + ' ' + ('00' + myDate.getUTCHours()).slice(-2) + ':' + ('00' + myDate.getUTCMinutes()).slice(-2) + ':' + ('00' + myDate.getUTCSeconds()).slice(-2);
       
        if (task==null || task=="")
        {

                dialog.info('No task');
        }
        else
        {
                //Date Validation       
                var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
                if (!validformat.test(date1))
                {
                  console.log(date1);
                  dialog.info("Invalid Date Format. Please correct and submit again.")
                }
                else{ //Detailed check for valid date ranges
                        var monthfield=date1.split("/")[0]
                        var dayfield=date1.split("/")[1]
                        var yearfield=date1.split("/")[2]
                        var dayobj = new Date(yearfield, monthfield-1, dayfield)
                        if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
                                dialog.info("Invalid Day, Month, or Year range detected. Please correct and submit again.")
                    }
                   

                 //If date and task entered in Okay, then insert into database after checking for duplicates.
                 var mysql = require('db-mysql');
                 new mysql.Database({
                        hostname: 'localhost',
                        user: 'root',
                        password: 'password',
                        database: 'project'
                        }).connect(function(error) {
                        if (error) {
                                return console.log('CONNECTION error: ' + error);
                                   }
                      //Select all rows and display resulti after storing into arr.
                      this.query('SELECT * FROM ' + this.name('project')).
                      execute(function(error, rows, cols) {
                      if (error) {
                        	console.log('ERROR: ' + error);
                        	return;
                      }
                      console.log(rows.length + ' ROWS found');
  
                      for(var i=0; i<rows.length; i++)
                      {

    	                  arr[i]= rows[i].task;
        	          console.log(rows[i].task);
                	  if(arr[i]==task)
                 	 {
                       		noInsert=1;
                       		dialog.info('Cannot write into Database. Duplicate Entry. Please go back and insert again');
                       		break;
                  	}
                  	else
                  	{
                        	noInsert=0;
                                                       
                  	}
                     }
                     console.log("noInsert="+noInsert);
                     next(noInsert);  
                       });
             
             });
     }
}
                

// This handler validates the task and date inputs through insertValidation function and inserts into the database if no duplicates are found.
app.post("/", function(req, res,next){
            

             task=req.param("task");
             date1=req.param("date");
             //Call to call back function for input validation.
             insertValidation(req,res,next);  
             noInsert = req.param(noInsert);        
             console.log("noInsertOutside="+noInsert);
             if(noInsert!=1) 
             { 
            	 var mysql = require('db-mysql');
             	 new mysql.Database({
                        hostname: 'localhost',
                        user: 'root',
                        password: 'password',
                        database: 'project'
                        }).connect(function(error) {
                        if (error) {
                                return console.log('CONNECTION error: ' + error);
                                }

                       console.log(task);
                       console.log(date2);
                      //Insert into database after checking for duplicates. 
                       this.query().
                       insert('project',
                         ['task', 'due_date'],
                         [ task, date2 ]
                         ).
                         execute(function(error, result) {
                       if (error) {
                                console.log('ERROR: ' + error);
                                return;
                       }
                       console.log('GENERATED id: ' + result.id);

                       next();
                       });


             });
          }

          res.redirect('/');
          res.end();
     
});



function deleteTask (req, res, next) {
         
 //Validate checkbox to perform deletion.
       var taskdone=req.param("taskdone");
       console.log("taskdone="+taskdone);
       if (taskdone==undefined || taskdone==null || taskdone=="")
       {
                var flag=1;
       }
       else
       {
                    flag=0;

       }
     if(flag==0)
      {
        //Delete from table if checkbox is ticked.
        var mysql = require('db-mysql');
        new mysql.Database({
        hostname: 'localhost',
        user: 'root',
        password: 'password',
        database: 'project'
        }).connect(function(error) {
        if (error) {
         return console.log('CONNECTION error: ' + error);
        }
        
        //Delete the row selected with the help of the variable taskdone.
        this.query('DELETE FROM ' + this.name('project') + ' WHERE ' + this.name('task') + '= \'' + this.escape(taskdone)+ '\'' ).
        execute(function(error, result) {
                if (error) {
                        console.log('ERROR: ' + error);
                        return;
                }
                console.log('RESULT: ', result);
                next();
        });

});
     } 
    
}


//Handler to delete a task when the done button is clicked. The call back function deleteTask handles this functionality.
app.post("/test",deleteTask,function(req,res,next){

 flag1=1;      
 res.redirect('/');
// res.end();

 });
