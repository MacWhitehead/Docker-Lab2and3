const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { report } = require("process");
const port = process.env.PORT || 3000;

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/userData", (req, res) => {
  let users = [];
  fs.readFile("users.json", (err, data) => {
    let users = JSON.parse(data).users;
    res.render("viewUsers", { users: users });
  });
});

app.post("/newUserSubmitted", (req, res) => {
  let submitUser = {};
  submitUser.username = uuidv4();
  submitUser.firstname = req.body.firstName;
  submitUser.lastname = req.body.lastName;
  submitUser.email = req.body.email;
  submitUser.age = req.body.age;
  fs.readFile("users.json", (err, data) => {
    let existingUsers = JSON.parse(data).users;
    existingUsers.push(submitUser);
    fs.writeFile("users.json", JSON.stringify({users: existingUsers}), (err) => {
      if (err) throw err;
    });
  });
  res.redirect("/userData");
});

app.get("/editUser/:index", (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;
    let selectedUser = JSON.parse(data).users[req.params.index]
    res.render('editUser', {user: selectedUser, index: req.params.index})
  })
})

app.post("/userEdited/:index", (req, res) => {
  fs.readFile('users.json', (err, data) => {
    let allUsers = JSON.parse(data).users;
    let updatedUser = {
      username: allUsers[req.params.index].username,
      firstname: req.body.firstName, 
      lastname: req.body.lastName,
      email: req.body.email, 
      age: req.body.age
    }
    allUsers[req.params.index] = updatedUser;
    fs.writeFile('users.json', JSON.stringify({users: allUsers}), (err) => {
      if (err) throw err 
    })
  })
      res.redirect("/userData");
});

app.post("/delete/:index", (req, res) => {
  fs.readFile('users.json', (err, data) => {
    let allUsers = JSON.parse(data).users;
    allUsers.splice(req.params.index, 1)
    fs.writeFile('users.json', JSON.stringify({users: allUsers}), (err) => {
      if (err) throw err;
    })
    res.redirect('/userData')
  })
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App Server listen on port: ${port}`);
});
