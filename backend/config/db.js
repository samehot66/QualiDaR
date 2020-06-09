var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Decade65*"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
con.query("CREATE DATABASE testdb", function (err, result) {
  // con.query("DROP DATABASE testdb", function (err, result) {
    if (err) throw err;
    console.log("Database create");
  });
});