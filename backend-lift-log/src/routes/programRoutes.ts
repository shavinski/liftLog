import express from 'express';
const programRouter = express.Router();

import { getAllPrograms } from '../controllers/programController';

programRouter.get('/', getAllPrograms)

export default programRouter;