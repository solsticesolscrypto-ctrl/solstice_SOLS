import express from "express";
import Joi from "joi";
import fs from "fs";
import path from "path";

const router = express.Router();
const DB_PATH = path.resolve("./airdrop-participants.json");

// Leer participantes
router.get("/airdrop-participants", (req, res) => {
  try {
    if (!fs.existsSync(DB_PATH)) return res.json([]);
    const data = fs.readFileSync(DB_PATH, "utf-8");
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Agregar participante
router.post("/airdrop-participants", (req, res) => {
  const schema = Joi.object({
    twitter: Joi.string().min(2).max(50).required(),
    solana: Joi.string().pattern(/^([1-9A-HJ-NP-Za-km-z]{32,44})$/).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: 'Datos inválidos', details: error.details });
  let participants = [];
  if (fs.existsSync(DB_PATH)) {
    participants = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  }
  participants.push({ ...value, date: new Date().toISOString() });
  fs.writeFileSync(DB_PATH, JSON.stringify(participants, null, 2));
  res.json({ ok: true });
});

export default router;
