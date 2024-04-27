// App.js

// Database
var db = require("./database/db-connector");
/*
    SETUP
*/
var express = require("express"); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 9017; // Set a port number at the top so it's easy to change in the future

const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars"); // Import express-handlebars
app.engine(".hbs", engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set("view engine", ".hbs"); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// app.js
// connect all webpages 
app.get("/", function(req, res){
  return res.render('index')
});
app.get("/index.html", function(req, res){
  return res.render('index')
});

app.get("/users.html", function(req, res){
  // let query1 = "SELECT * FROM Users;";
  let query1;

  if (req.query.user_name === undefined){
    query1 = "SELECT * FROM Users;";
  }else{
    query1 = `SELECT * FROM Users WHERE user_name LIKE "%${req.query.user_name}%"`
  }
  db.pool.query(query1, function(error, rows, fields){
    // console.log(rows);
    res.render('users', {data:rows})
  })
});

// app.js - ROUTES section
app.post('/add-user-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Users (user_name, user_location, user_website, user_industry) VALUES ('${data.user_name}', '${data.user_location}', '${data.user_website}', '${data.user_industry}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on DevDetails
            query2 = `SELECT * FROM Users;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
app.delete('/delete-user-ajax/', function(req,res,next)
{
  let data = req.body;
  let user_id = parseInt(data.user_id);
  let delete_Users_user = `DELETE FROM Users WHERE user_id = ${user_id}`;

        // Run the 1st query
        db.pool.query(delete_Users_user, [user_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
})});

app.put('/put-user-ajax', function(req,res,next){
  let data = req.body;
  let user_id = parseInt(data.user_id);
  user_website = data.user_website;
  //console.log(user_website)
  let queryUpdateUser = `UPDATE Users SET user_website = '${user_website}' WHERE user_id = ${user_id}`

        // Run the 1st query
        db.pool.query(queryUpdateUser, [user_website, user_id], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
              res.send(rows);
            }
})});


app.get("/AItools.html", function(req, res){
  // let query1 = "SELECT * FROM AITools;";
  let query1;

  if (req.query.tool_name === undefined){
    query1 = "SELECT * FROM AITools;";
  }else{
    query1 = `SELECT * FROM AITools WHERE tool_name LIKE "%${req.query.tool_name}%"`
  }
  
  db.pool.query(query1, function(error, rows, fields){
    res.render('AItools', {data:rows})
})
});

app.post('/add-tool-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO AITools (tool_name, tool_type, price, release_date, category) VALUES ('${data.tool_name}', '${data.tool_type}', ${data.price}, '${data.release_date}', '${data.category}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on AITools
            query2 = `SELECT * FROM AITools;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-tool-ajax/', function(req,res,next)
{
  let data = req.body;
  let tool_id = parseInt(data.tool_id);
  let delete_Tools_tool = `DELETE FROM AITools WHERE tool_id = ${tool_id}`;

        // Run the 1st query
        db.pool.query(delete_Tools_tool, [tool_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
})});

app.get("/downloads.html", function(req, res){
  // let query1 = "SELECT * FROM Downloads;";
  let query1;

  if (req.query.download_id === undefined){
    query1 = "SELECT d.download_id, d.tool_id, a.tool_name, d.user_id, u.user_name, d.order_id, o.order_date, d.download_date, d.download_success FROM Downloads d LEFT JOIN AITools a ON d.tool_id = a.tool_id LEFT JOIN Users u ON d.user_id = u.user_id LEFT JOIN Orders o ON d.order_id = o.order_id;";
  }else{
    query1 = `SELECT d.download_id, d.tool_id, a.tool_name, d.user_id, u.user_name, d.order_id, o.order_date, d.download_date, d.download_success FROM Downloads d LEFT JOIN AITools a ON d.tool_id = a.tool_id LEFT JOIN Users u ON d.user_id = u.user_id LEFT JOIN Orders o ON d.order_id = o.order_id WHERE d.download_id = ${req.query.download_id}`;
  }
  let query2 = "SELECT * FROM Orders;";
  let query3 = "SELECT * FROM AITools;";
  let query4 = "SELECT * FROM Users;";

  //let query1 = "SELECT d.download_id, d.tool_id, a.tool_name, d.user_id, u.user_name, d.order_id, o.order_date, d.download_date, d.download_success FROM Downloads d LEFT JOIN AITools a ON d.tool_id = a.tool_id LEFT JOIN Users u ON d.user_id = u.user_id LEFT JOIN Orders o ON d.order_id = o.order_id;";
  db.pool.query(query1, function(error, rows, fields){
    let downloadDetails = rows;

    db.pool.query(query2, (error, rows, fields)=>{
      let orders = rows;

      db.pool.query(query3, (error, rows, fields)=>{
        let tools = rows;
      
        db.pool.query(query4, (error, rows, fields)=>{
          let users = rows;
          return res.render('downloads', {data:downloadDetails, orders:orders, tools:tools, users:users})
        })
      })
    })
    // res.render('downloads', {data:rows})
})
});

app.post('/add-download-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Downloads (tool_id, user_id, order_id, download_date, download_success) VALUES (${data.tool_id}, ${data.user_id}, ${data.order_id}, '${data.download_date}', ${data.download_success})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Downloads
            query2 = "SELECT d.download_id, d.tool_id, a.tool_name, d.user_id, u.user_name, d.order_id, o.order_date, d.download_date, d.download_success FROM Downloads d LEFT JOIN AITools a ON d.tool_id = a.tool_id LEFT JOIN Users u ON d.user_id = u.user_id LEFT JOIN Orders o ON d.order_id = o.order_id;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-download-ajax/', function(req,res,next)
{
  let data = req.body;
  let download_id = parseInt(data.download_id);
  let delete_Downloads_download = `DELETE FROM Downloads WHERE download_id = ${download_id}`;

        // Run the 1st query
        db.pool.query(delete_Downloads_download, [download_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
})});

app.get("/orders.html", function(req, res){
  // let query1 = "SELECT * FROM Orders;";
  let query1;

  if (req.query.order_id === undefined){
    query1 = "SELECT o.order_id, o.user_id, u.user_name, o.order_date, o.order_amount, o.payment_complete FROM Orders o LEFT JOIN Users u ON o.user_id = u.user_id;";
  }else{
    query1 = `SELECT o.order_id, o.user_id, u.user_name, o.order_date, o.order_amount, o.payment_complete FROM Orders o LEFT JOIN Users u ON o.user_id = u.user_id WHERE o.order_id = ${req.query.order_id}`
  }
  let query2 = "SELECT * FROM Users;";

  db.pool.query(query1, function(error, rows, fields){
    let orders = rows;

    db.pool.query(query2, (error, rows, fields)=>{
      let users = rows;
      return res.render('orders', {data:orders, users:users})
    })
    // res.render('orders', {data:rows})
})
});

app.post('/add-order-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (user_id, order_date, order_amount, payment_complete) VALUES ('${data.user_id}', '${data.order_date}', ${data.order_amount}, ${data.payment_complete})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on DevDetails
            query2 = `SELECT * FROM Orders;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-order-ajax/', function(req,res,next)
{
  let data = req.body;
  let order_id = parseInt(data.order_id);
  let delete_Orders_order = `DELETE FROM Orders WHERE order_id = ${order_id}`;

        // Run the 1st query
        db.pool.query(delete_Orders_order, [order_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
})});

app.get("/orderdetails.html", function(req, res){
  // let query1 = "SELECT * FROM OrderDetails;";
  let query1;

  if (req.query.order_id === undefined){
    query1 = "SELECT od.order_details_id, od.order_id, o.user_id, u.user_name, od.tool_id, a.tool_name FROM OrderDetails od LEFT JOIN Orders o ON od.order_id = o.order_id LEFT JOIN Users u ON o.user_id = u.user_id LEFT JOIN AITools a ON od.tool_id = a.tool_id;";
  }else{
    query1 = `SELECT od.order_details_id, od.order_id, o.user_id, u.user_name, od.tool_id, a.tool_name FROM OrderDetails od LEFT JOIN Orders o ON od.order_id = o.order_id LEFT JOIN Users u ON o.user_id = u.user_id LEFT JOIN AITools a ON od.tool_id = a.tool_id WHERE od.order_id = ${req.query.order_id};`;
  }
  let query2 = "SELECT * FROM Orders;";
  let query3 = "SELECT * FROM AITools;";

  //let query1 = "SELECT od.order_details_id, od.order_id, o.user_id, u.user_name, od.tool_id, a.tool_name FROM OrderDetails od LEFT JOIN Orders o ON od.order_id = o.order_id LEFT JOIN Users u ON o.user_id = u.user_id LEFT JOIN AITools a ON od.tool_id = a.tool_id;";
  db.pool.query(query1, function(error, rows, fields){
    // res.render('orderdetails', {data:rows})
    let orderdetails = rows;

    db.pool.query(query2, (error, rows, fields)=>{
      let orders = rows;

      db.pool.query(query3, (error, rows, fields)=>{
        let tools = rows;
        return res.render('orderdetails', {data:orderdetails, orders:orders, tools:tools})
      })
    })
})
});

app.post('/add-order-detail-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO OrderDetails (order_id, tool_id) VALUES (${data.order_id}, ${data.tool_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT 
            query2 = "SELECT od.order_details_id, od.order_id, o.user_id, u.user_name, od.tool_id, a.tool_name FROM OrderDetails od LEFT JOIN Orders o ON od.order_id = o.order_id LEFT JOIN Users u ON o.user_id = u.user_id LEFT JOIN AITools a ON od.tool_id = a.tool_id;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-order-detail-ajax/', function(req,res,next)
{
  let data = req.body;
  let order_details_id = parseInt(data.order_details_id);
  let delete_order_details_id = `DELETE FROM OrderDetails WHERE order_details_id = ${order_details_id}`;

        // Run the 1st query
        db.pool.query(delete_order_details_id, [order_details_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
})});


app.get("/developers.html", function(req, res){
  let query1;

  if (req.query.dev_name === undefined){
    query1 = "SELECT * FROM Developers;";
  }else{
    query1 = `SELECT * FROM Developers WHERE dev_name LIKE "%${req.query.dev_name}%"`;
  }
  //let query1 = "SELECT * FROM Developers;";
  db.pool.query(query1, function(error, rows, fields){
    res.render('developers', {data:rows})
})
});

app.post('/add-dev-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Developers (dev_name, dev_location, dev_website) VALUES ('${data.dev_name}', '${data.dev_location}', '${data.dev_website}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on AITools
            query2 = `SELECT * FROM Developers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-dev-ajax/', function(req,res,next)
{
  let data = req.body;
  let dev_id = parseInt(data.dev_id);
  let delete_Developers_developer = `DELETE FROM Developers WHERE dev_id = ${dev_id}`;

        // Run the 1st query
        db.pool.query(delete_Developers_developer, [dev_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
})});

app.get("/developerDetails.html", function(req, res){
  // let query1 = "SELECT * FROM DevDetails;"; 
  let query1; 

  if (req.query.tool_id === undefined){
    // query1 = "SELECT * FROM DevDetails;";
    query1 = "SELECT dd.dev_details_id, dd.tool_id, a.tool_name, dd.dev_id, d.dev_name FROM DevDetails dd LEFT JOIN AITools a ON dd.tool_id = a.tool_id LEFT JOIN Developers d ON dd.dev_id = d.dev_id;"
  }
  else{
    // query1 = `SELECT * FROM DevDetails WHERE tool_id = ${req.query.tool_id}`
    query1 = `SELECT dd.dev_details_id, dd.tool_id, a.tool_name, dd.dev_id, d.dev_name FROM DevDetails dd LEFT JOIN AITools a ON dd.tool_id = a.tool_id LEFT JOIN Developers d ON dd.dev_id = d.dev_id WHERE dd.tool_id = ${req.query.tool_id}`
  }

  let query2 = "SELECT * FROM AITools;";

  let query3 = "SELECT * FROM Developers;";

  db.pool.query(query1, function (error, rows, fields) {

    // Save the dev details 
    let devDetails = rows; 

    db.pool.query(query2, (error, rows, fields)=>{

      // Save the tools 
      let tools = rows;

      db.pool.query(query3, (error, rows, fields)=>{

        // Save the devs
        let devs = rows;
        return res.render('developerDetails', {data: devDetails, tools: tools, devs: devs});
      })
    })
  })
});

// app.js - ROUTES section
app.post('/add-dev-detail-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO DevDetails (tool_id, dev_id) VALUES (${data.tool_id}, ${data.dev_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on DevDetails
            query2 = `SELECT * FROM DevDetails;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-dev-detail-ajax/', function(req,res,next)
{
  let data = req.body;
  let dev_details_id = parseInt(data.dev_details_id);
  let delete_dev_details_id = `DELETE FROM DevDetails WHERE dev_details_id = ${dev_details_id}`;

        // Run the 1st query
        db.pool.query(delete_dev_details_id, [dev_details_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            } else {
              res.sendStatus(204);
            }
})});

app.put('/put-dev-detail-ajax', function(req,res,next){
  let data = req.body;
  let dev_details_id = parseInt(data.dev_details_id);
  let tool_id = parseInt(data.tool_id);
  let dev_id = parseInt(data.dev_id);

  let queryUpdateDevDetail = `UPDATE DevDetails SET tool_id = ${tool_id}, dev_id = ${dev_id} WHERE dev_details_id = ${dev_details_id}`

        // Run the 1st query
        db.pool.query(queryUpdateDevDetail, [dev_details_id, tool_id, dev_id], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
              res.send(rows);
            }
})});



/*
    LISTENER
*/
app.listen(PORT, function () {
  // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
