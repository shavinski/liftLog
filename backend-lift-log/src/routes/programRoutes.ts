"use strict";

import express from 'express';
const programRouter = express.Router();

import { getUserWorkoutPrograms, getSingleUserProgram, createUserWorkoutProgram } from '../controllers/programController';
import { authenticateJWT } from '../middleware/authenticateJWT';

// Arguments in order for routes
// First arg  will be the endpoint we want
// BASE ENDPOINT === "programs"
// Second arg ... nth arg can be middle ware
// Final arg will be the function that we want to run, located in the controllers

programRouter.get('/', authenticateJWT, getUserWorkoutPrograms);
programRouter.post('/', authenticateJWT, createUserWorkoutProgram);
programRouter.get('/:id', authenticateJWT, getSingleUserProgram);

export default programRouter;