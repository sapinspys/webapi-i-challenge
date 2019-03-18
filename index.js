// implement your API here:

// Using require() to import express module:
// ES2015: 
  // import express from 'express';
const express = require('express');
const db = require('./data/db');

// Creates an express application (used to configure server):
const server = express();
// ADD THIS LINE TO READ REQUEST BODIES:
server.use(express.json());

// Setting up route handler functions on endpoints:
// POST: Creates a user using the information sent inside the `request body`.
server.post(`/api/users`,  (req, res) => {
  try {
    const userInfo = req.body
    res.status(201).json(userInfo)
  } catch(error) {
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  }
})

// GET: returns an array of all the user objects contained in the database. 
// server.get('/api/users', (req, res) => {

// })

// Turning on the server:
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
)