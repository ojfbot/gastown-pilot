import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes/index.js';
import { getLogger } from './utils/logger.js';

const log = getLogger('server');
const app = express();
const port = Number(process.env.PORT ?? 3018);

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3017' }));
app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  log.info(`GasTown Pilot API running on port ${port}`);
});
