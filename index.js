// implement your API here:

// ES2015 import method: import express from 'express';
// Importing using require() method:
const express = require('express');
const db = require('./data/db');

// Creating an express application (used to configure server):
const server = express();
server.use(express.json()); // ADD THIS LINE TO READ REQUEST BODIES...

// Setting up route handler functions on endpoints:

// POST: Creates a user using the information sent inside the `request body`.
server.post(`/api/users`,  (req, res) => {
  try {
    const userData = req.body
    if (userData.name.length === 0 || userData.bio.length === 0) {
      // 400 => BAD REQUEST
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
      db.insert(userData)
      // 201 => CREATED
      res.status(201).json(userData) 
    }
  } catch(error) {
    // 505 => INTERNAL SERVER ERROR
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  }
})

// GET: returns an array of all the user objects contained in the database. 
server.get(`/api/users`, (req, res) => {
  try {
    // 200 => OK
    res.status(200).json(db.find())
  } catch(error) {
    res.status(500).json({ error: "The users' information could not be retrieved." })
  }
})

// GET: Returns the user object with the specified `id`. 
server.get('/api/users/:id', (req, res) => {
  try {
    const foundUser = db.findById(req.body.id)
    if (foundUser.length === 0) {
      // 404 => NOT FOUND
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
      res.status(200).json(foundUser)
    }
  } catch(error) {
    res.status(500).json({ error: "The user information could not be retrieved." })
  }
})

// DELETE: Removes the user with the specified `id` and returns the deleted user.
server.delete(`/api/users/:id`, (req,res) => {
  try {
    const usersDeleted = db.remove(req.body.id)
    if (usersDeleted.length === 0) {
      // 404 => NOT FOUND
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
      res.status(200).json(req.body)
    }
  } catch(error) {
    res.status(500).json({ error: "The user could not be removed." })
  }
})

// Turning on the server:
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
)