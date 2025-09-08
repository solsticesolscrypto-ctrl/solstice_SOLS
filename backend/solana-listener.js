import { Connection, PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC);
const RECEIVER = new PublicKey(process.env.SOLANA_WALLET);

// Escucha pagos entrantes en la wallet de Solana y ejecuta callback
export function listenSolPayments(callback) {
  let lastSignature = null;
  setInterval(async () => {
    try {
      const sigs = await connection.getSignaturesForAddress(RECEIVER, { limit: 10 });
      for (const sig of sigs) {
        if (sig.signature === lastSignature) break;
        if (sig.err === null && sig.memo === null) {
          // Obtener detalles de la transacción
          const tx = await connection.getTransaction(sig.signature, { commitment: "confirmed" });
          if (tx && tx.meta && tx.meta.postBalances && tx.transaction.message.accountKeys[0].toBase58() !== RECEIVER.toBase58()) {
            // Llama al callback con la info de la transacción
            callback({ signature: sig.signature, tx });
          }
        }
      }
      if (sigs.length > 0) lastSignature = sigs[0].signature;
    } catch (e) {}
  }, 10000); // cada 10 segundos
}
