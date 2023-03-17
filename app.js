// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname +"/date.js");


const app = express();

let items= ["Buy Food","Cook Food", "Eat Food"];
let workItems= [];

// Rendering Ejs Templating
app.set('view engine', 'ejs');


// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Rendering Public Resourceses
app.use(express.static("public"));

// parse application/json

app.get("/", (req, res)=>{
    const day =  date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
});

app.get("/work",(req, res)=>{
    const day =  date.getDay();
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/", (req, res)=>{
   let item = req.body.newItem;

   if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
   }else{
    items.push(item);
    res.redirect("/");
   }
     
});

app.get("/about", (req, res)=>{
    res.render("about");
})

app.listen(3000, (req, res)=>{
    console.log("Server running at https://localhost:3000");
});