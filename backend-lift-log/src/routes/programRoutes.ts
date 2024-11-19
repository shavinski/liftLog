import express, { NextFunction } from 'express';
const programRouter = express.Router();

import { getAllProgramsSingleUser } from '../controllers/programController';
import { authenticateJWT } from '../middleware/auth';

// Arguments in order for routes
// First arg  will be the endpoint we want
// BASE ENDPOINT === "programs"
// Second arg ... nth arg can be middle ware
// Final arg will be the function that we want to run, located in the controllers

programRouter.get('/', authenticateJWT, getAllProgramsSingleUser)

export default programRouter;