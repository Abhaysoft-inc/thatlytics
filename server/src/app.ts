import express from 'express';
import cors from 'cors'
import eventRoutes from './routes/events/event.routes'
import authRoutes from './routes/auth/auth.routes'
import projectRoutes from './routes/projects/projects.routes'

const app = express();

app.use(cors())
app.use(express.json());

// routes

app.use('/events', eventRoutes)
app.use('/auth', authRoutes)
app.use('/projects', projectRoutes)

export default app;
