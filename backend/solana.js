import { Connection, Keypair, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import dotenv from "dotenv";
dotenv.config();

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const connection = new Connection(SOLANA_RPC);
const wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SOLANA_PRIVATE_KEY)));
const MINT = new PublicKey(process.env.SOLANA_TOKEN_MINT);

// Envía tokens SOLS a una wallet de Solana
export async function sendSolsToken(destAddress, amount) {
  const dest = new PublicKey(destAddress);
  // Obtener o crear la cuenta asociada del destinatario
  const destTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    MINT,
    dest
  );
  // Obtener la cuenta asociada del emisor
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    wallet,
    MINT,
    wallet.publicKey
  );
  // Crear instrucción de transferencia
  const tx = new Transaction().add(
    createTransferInstruction(
      fromTokenAccount.address,
      destTokenAccount.address,
      wallet.publicKey,
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  );
  // Firmar y enviar
  const sig = await connection.sendTransaction(tx, [wallet]);
  return sig;
}
