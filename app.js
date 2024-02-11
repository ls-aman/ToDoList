//jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const date = require(__dirname + "/date.js")

const values = [];
const workvalues = [];

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", 'ejs');

app.get("/", function(req , res){

  const day = date.getDate();
  res.render("list", {listTitle : day, newListItems : values});


  // switch (currentDay) {
  //   case 0:
  //   day = "Sunday";
  //     break;
  //   case 1:
  //   day = "Monday";
  //     break;
  //   case 2:
  //   day = "Tuesday";
  //     break;
  //   case 3:
  //   day = "Wednesday";
  //     break;
  //   case 4:
  //   day = "Thursday";
  //     break;
  //   case 5:
  //   day = "Friday";
  //     break;
  //   case 6:
  //   day = "Saturday";
  //     break;
  //   default:
  //   console.log("ERROR: Invalid Day");
  // }


});

app.post("/", function(req, res){

  var value = req.body.newitem;

  if(req.body.list === "Work List"){
    workvalues.push(value);
    res.redirect("/work");
  }else{
    values.push(value);
    res.redirect("/");
  }


});

app.get("/work", function(req, res){
    res.render("list", {listTitle : "Work List", newListItems : workvalues});
});

app.post("/work", function(req, res){
  let workValue = req.body.newitem;
  workvalues.push(workValue);
  res.redirect("/work");
});

app.listen(5000, function(){

  console.log("Running!!...");

});
