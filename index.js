// implement your API here:

// Port declaration
const port = 5000;

// ES2015 module importing: 
// import express from 'express';

// Importing modules using require():
const express = require('express');
const db = require('./data/db.js');

// Creating an express application (used to configure our server):
const server = express();
server.use(express.json()); // ADD THIS LINE TO READ REQUEST BODIES...

// Setting up ROUTER HANDLER FUNCTIONS on ENDPOINTS:

// POST: Creates a user using the information sent inside the `request body`. 'CREATE' of CRUD.
server.post(`/api/users`,  (req, res) => {
  const userData = req.body
  if (userData.name.length === 0 || userData.bio.length === 0) {
    // 400 => BAD REQUEST
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    db.insert(userData) // Returns a PROMISE! 
      .then(newUserId => {
        db.findById(newUserId.id)
          .then(newUser => {
            // 201 => CREATED
            res.status(201).json(newUser);
          })
          .catch(error => {
            res.status(500).json({ error: "The new user's information could not be retrieved." })
          })
      })
      .catch(error => {
        // 505 => INTERNAL SERVER ERROR
        res.status(500).json({ error: "There was an error while saving the user to the database" })
      })
  }
})

// GET: returns an array of all the user objects contained in the db.  'READ' of CRUD.
server.get(`/api/users`, (req, res) => {
  // 200 => OK
  db.find()
    .then(allUsers => {
      res.status(200).json(allUsers)
    })
    .catch(error => {
      res.status(500).json({ error: "The users could not be retrieved." })
    })
})

// GET: Returns the user object with the specified `id`. 
server.get(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(foundUser => {
      if (!foundUser) {
        // 404 => NOT FOUND
        res.status(404).json({ message: `The user with the specified ID does not exist.` })
      } else {
        res.status(200).json(foundUser)
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

// DELETE: Removes the user with the specified `id` and returns the deleted user. 'DELETE' of CRUD.
server.delete(`/api/users/:id`, (req,res) => {
  const id = req.params.id;
  db.findById(id)
    .then(foundUser => {
      if (!foundUser) {
        // 404 => NOT FOUND
        res.status(404).json({ message: `The user with the specified ID does not exist.` })
      } else {
        db.remove(id)
        .then(numUsersDeleted => {
          if (numUsersDeleted !== 0) {
            res.status(200).json(foundUser)
          }
        })
        .catch(error => {
          res.status(500).json({ error: "The user could not be removed." })
        })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

// POST: Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. 'UPDATE' of CRUD.
server.put(`/api/users/:id`, (req,res) => {
  const id = req.params.id;
  const userData = req.body;
  if (userData.name.length === 0 || userData.bio.length === 0) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    db.update(id, userData)
      .then(numUsersUpdated => {
        if (numUsersUpdated === 0) {
          res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
          db.findById(id)
            .then(user => {
              res.status(200).json(user);
            })
            .catch(error => {
            res.status(500).json({ error: "The new user's information could not be retrieved." })
            })
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
      }) 
  }
})

// Turning on the server:
server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
)