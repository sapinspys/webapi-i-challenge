// implement your API here:

// Using require() to import express module:
// ES2015: 
  // import express from 'express';
const express = require('express');
const db = require('./data/db');

// Creates an express application (used to configure server):
const server = express();

// Setting up route handler functions on endpoints:

// POST: Creates a user using the information sent inside the `request body`.
// server.post(`/api/users`, )

// GET: returns an array of all the user objects contained in the database. 
// server.get('/api/users', (req, res) => {

// })

// Turning on the server:
server.listen(8000, () => console.log('API running on port 8000'))