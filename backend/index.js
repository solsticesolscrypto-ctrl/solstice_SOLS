import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { listenSolPayments } from "./solana-listener.js";
import solsRouter from "./routes/sols.js";
import airdropRouter from "./routes/airdrop.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
// Configurar CORS: permite solo el origen de producción y localhost
app.use(cors({
  origin: [process.env.CORS_ORIGIN || 'http://localhost:5173'],
  methods: ['GET', 'POST'],
}));
app.use(express.json());
// Logs HTTP estructurados
app.use(morgan('combined'));

// Solo lógica de Solana activa

// Escuchar pagos en Solana
listenSolPayments(async (info) => {
  try {
    // Obtener la dirección del comprador (primer accountKey que no sea la wallet receptora)
    const keys = info.tx.transaction.message.accountKeys.map(k => k.toBase58());
    const sender = keys.find(k => k !== process.env.SOLANA_WALLET);
    // Calcular cantidad de SOL recibido (en lamports)
    const pre = info.tx.meta.preBalances[1];
    const post = info.tx.meta.postBalances[1];
    const solReceived = (post - pre) / 1e9;
    // Define el ratio de conversión SOL -> $SOLS aquí:
    const tokensToSend = solReceived * 10000; // Ejemplo: 1 SOL = 10,000 $SOLS
    if (tokensToSend > 0 && sender) {
      const sig = await sendSolsToken(sender, tokensToSend);
      console.log(`Enviados ${tokensToSend} $SOLS a ${sender}. Tx: ${sig}`);
    }
  } catch (e) {
    console.error("Error al enviar $SOLS automáticamente:", e);
  }
});

// Endpoint de prueba
app.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

// Endpoint para enviar tokens SOLS tras pago validado
// Modularización: rutas de SOLS
app.use("/", solsRouter);
app.use("/", airdropRouter);

// Middleware de manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Solstice backend escuchando en puerto 4000");
});
