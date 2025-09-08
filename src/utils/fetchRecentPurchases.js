// Utilidad para obtener compras reales de la blockchain de Solana usando Helius
// Requiere la dirección de la wallet de preventa y una API Key de Helius


// Las claves/API keys deben ir SIEMPRE en variables de entorno y NUNCA hardcodeadas.


export async function fetchRecentPurchases(limit = 5) {
	const PREVENTA_WALLET = import.meta.env.VITE_PREVENTA_WALLET;
	const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
	if (!PREVENTA_WALLET || !HELIUS_API_KEY) {
		throw new Error('[Helius] Faltan variables de entorno VITE_PREVENTA_WALLET o VITE_HELIUS_API_KEY. Configura tu .env y nunca subas claves reales a ningún repositorio.');
	}
	const HELIUS_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

	// Consulta las últimas transacciones recibidas por la wallet de preventa
	const body = {
		jsonrpc: "2.0",
		id: "recent-txs",
		method: "getSignaturesForAddress",
		params: [PREVENTA_WALLET, { limit }]
	};
	const res = await fetch(HELIUS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	const data = await res.json();
	if (!data.result) return [];

	// Para cada transacción, obtener detalles para saber el remitente y la cantidad
	const txs = await Promise.all(
		data.result.map(async (tx) => {
			const txBody = {
				jsonrpc: "2.0",
				id: "tx-details",
				method: "getTransaction",
				params: [tx.signature, { encoding: "jsonParsed" }]
			};
			const txRes = await fetch(HELIUS_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(txBody)
			});
			const txData = await txRes.json();
			const instructions = txData.result?.transaction?.message?.instructions || [];
			// Buscar la instrucción de transferencia a la wallet de preventa
			let from = '';
			let sol = 0;
			for (const ix of instructions) {
				if (ix.parsed && ix.parsed.type === 'transfer' && ix.parsed.info?.destination === PREVENTA_WALLET) {
					from = ix.parsed.info.source;
					sol = Number(ix.parsed.info.lamports) / 1e9;
				}
			}
			// Si no es transferencia, ignorar
			if (!from || sol === 0) return null;
			// El número de tokens depende de tu lógica de conversión (ejemplo: 1 SOL = 10,000 $SOLS)
			const tokens = sol * 10000;
			// Acortar la dirección para mostrar
			const short = from.slice(0, 4) + '...' + from.slice(-3);
			return { wallet: short, tokens: Math.round(tokens), sol };
		})
	);
	// Filtrar nulos y devolver los más recientes
	return txs.filter(Boolean);
}
