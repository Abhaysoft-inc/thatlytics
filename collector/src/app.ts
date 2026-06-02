import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'

const app = express();

const allowedOrigins = new Set([
	'http://localhost:3000',
	'http://localhost:3001',
	'http://localhost:5173',
	'http://localhost:5500',
	'http://127.0.0.1:3000',
	'http://127.0.0.1:3001',
	'http://127.0.0.1:5173',
	'http://127.0.0.1:5500',
]);

const corsOptions = {
	origin(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
		if (!origin || allowedOrigins.has(origin)) {
			callback(null, true);
			return;
		}

		callback(new Error(`CORS blocked for origin: ${origin}`));
	},
	credentials: true,
};

app.use(cors(corsOptions));
app.options('/{*splat}', cors(corsOptions));
app.use(express.json());

app.use('/api/v1', routes);

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => console.log("Server is listening on PORT: ", port));

export default app;
