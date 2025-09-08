import express from "express";
import Joi from "joi";
import { sendSolsToken } from "../solana.js";

const router = express.Router();

// Endpoint para enviar tokens SOLS tras pago validado
router.post("/send-sols", async (req, res) => {
  // Esquema de validación con Joi
  const schema = Joi.object({
    solanaAddress: Joi.string().pattern(/^([1-9A-HJ-NP-Za-km-z]{32,44})$/).required(),
    amount: Joi.number().integer().min(1).max(1000000000).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: 'Datos inválidos', details: error.details });
  }
  try {
    const sig = await sendSolsToken(value.solanaAddress, value.amount);
    res.json({ ok: true, signature: sig });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
