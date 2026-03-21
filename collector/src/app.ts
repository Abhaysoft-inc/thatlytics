import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log("Server is listening on PORT: ", port));

export default app;
