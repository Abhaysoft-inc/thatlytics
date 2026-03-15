import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT) || 3000;


app.listen(port, () => console.log("Server is listening on PORT: ", port));

export default app;
