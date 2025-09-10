import express from 'express';
import cors from 'cors'
import eventRoutes from './routes/events/event.routes'

const app = express();

app.use(cors())
app.use(express.json());

// routes

app.use('/events', eventRoutes)

export default app;
