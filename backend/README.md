# Backend preventa Solstice ($SOLS)

## ¿Qué hace este backend?
- Escucha pagos en Solana Phantom
- Envía automáticamente tokens $SOLS a la wallet Solana del comprador
- Expone endpoints para conectar con el frontend

## Configuración
1. Copia `.env.example` a `.env` y rellena tus claves privadas y direcciones.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el backend:
   ```bash
   npm start
   ```

## Variables de entorno
- `SOLANA_PRIVATE_KEY`: Clave privada de la wallet que enviará los $SOLS (en formato array/base58)
- `SOLANA_TOKEN_MINT`: Dirección mint de tu token $SOLS
- `SOLANA_WALLET`: Wallet de Solana que recibirá los pagos
- `PORT`: Puerto del backend (por defecto 4000)

## Notas
- Debes implementar la lógica de escucha de pagos y el envío real de tokens en los endpoints.
- No compartas tus claves privadas.
- Puedes ampliar la API según tus necesidades.
