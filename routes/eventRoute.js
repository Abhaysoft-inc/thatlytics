import { Router } from "express";
import pool from '../config/db.config.js';

const router = Router();

// logging page

router.post('/saveEvent', async (req, res) => {
    // const { event_name, url, timestamp, properties } = req.body;

    const query = await pool.query(
        "INSERT INTO events (event_name, url, user_id, properties) VALUES ($1,$2,$3,$4)",
        ["page_view", "/home", "u1", { browser: "chrome" }]
    );

    if (!query) return res.send("error occured");

    return res.send(query)
})

export default router;