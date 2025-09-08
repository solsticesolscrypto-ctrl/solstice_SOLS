
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Button from './ui/Button.jsx';
import { fetchRecentPurchases } from '../utils/fetchRecentPurchases';

const DEST_SOL = '3qxa32hbFKMTAesrtUBykqRcNnzGpix3F3QHQR5JcPBT';

const Presale = ({ t }) => {
  const [amount, setAmount] = useState('');
  const MAX_TOKENS_PER_WALLET = 4000000;
  // Guardar solo la clave del mensaje, no el texto traducido
  const [successMsgKey, setSuccessMsgKey] = useState('');
  const [errorMsgKey, setErrorMsgKey] = useState('');
  const [walletType, setWalletType] = useState(null); // 'phantom' | null
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Chequeo de conexión Phantom solo si está autorizada
  // Eliminado el autoconnect: la wallet solo se conecta si el usuario pulsa el botón

  // Estado para compras recientes
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoadingPurchases(true);
    fetchRecentPurchases(7).then(data => {
      if (mounted) {
        setRecentPurchases(data);
        setLoadingPurchases(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  // Desconectar Phantom
  const handleDisconnectPhantom = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        await window.solana.disconnect();
      } catch (e) {}
    }
    setWalletType(null);
    setAddress('');
  };

  // Opcional: lógica de barra de progreso y layout
  const TOTAL_TOKENS = 1000000;
  const [soldTokens, setSoldTokens] = useState(0);
  const percentSold = Math.min(100, Math.round((soldTokens / TOTAL_TOKENS) * 100));

  // Función para obtener el mínimo de compra según el porcentaje vendido
  function getMinAmount(p) {
    if (p < 20) return 0.5;
    if (p < 50) return 0.25;
    if (p < 80) return 0.1;
    return 0.01;
  }
  const minAmount = getMinAmount(percentSold);
  const TOKEN_PRICE_USD = 0.01;
  const raised = soldTokens * TOKEN_PRICE_USD;

  const handleConnectPhantom = async () => {
    setErrorMsgKey('');
    try {
      if (window.solana && window.solana.isPhantom) {
        setLoading(true);
        console.log('[Phantom] Intentando conectar...');
        const resp = await window.solana.connect({ onlyIfTrusted: false });
        console.log('[Phantom] Conectado:', resp);
        setWalletType('phantom');
        setAddress(resp.publicKey.toString());
      } else {
        console.error('[Phantom] No se detectó la extensión Phantom.');
        setErrorMsgKey('phantom-not-found');
      }
    } catch (err) {
      console.error('[Phantom] Error al conectar:', err);
      setErrorMsgKey('phantom-connect-error');
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    setSuccessMsgKey('');
    setErrorMsgKey('');
    if (!walletType || walletType !== 'phantom' || !address) {
      setErrorMsgKey('presale-connect-required');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) < minAmount) {
      setErrorMsgKey('min-solana-rent');
      return;
    }
    // Validar máximo de tokens por wallet
    if (Number(amount) * 10000 > MAX_TOKENS_PER_WALLET) {
      setErrorMsgKey('presale-max-tokens-wallet');
      return;
    }
    setLoading(true);
    try {
      // --- INTEGRACIÓN PHANTOM ---
      const { solana } = window;
      if (!solana || !solana.isPhantom) throw new Error('phantom-not-found');
      // Importar dependencias dinámicamente
      const web3 = await import('@solana/web3.js');
  // Usar el endpoint de Helius para evitar bloqueo por CSP
  const connection = new web3.Connection(`https://mainnet.helius-rpc.com/?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`);
      const destPubkey = new web3.PublicKey(DEST_SOL);
      // Validar que la dirección conectada es la que firma
      const walletPublicKey = solana.publicKey?.toString() || address;
      if (walletPublicKey !== address) throw new Error('phantom-connect-error');
      const fromPubkey = new web3.PublicKey(walletPublicKey);
      const lamports = Math.floor(Number(amount) * 1e9); // 1 SOL = 1e9 lamports
      const tx = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey,
          toPubkey: destPubkey,
          lamports,
        })
      );
      tx.feePayer = fromPubkey;
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      // IMPORTANTE: Phantom solo funciona en sitios HTTPS y con permisos concedidos
      console.log('[Phantom] Solicitando firma de transacción:', tx);
      const signed = await solana.signTransaction(tx);
      console.log('[Phantom] Transacción firmada:', signed);
      const sig = await connection.sendRawTransaction(signed.serialize());
      console.log('[Phantom] Transacción enviada. Signature:', sig);
      setSuccessMsgKey('presale-success');
      setSoldTokens(prev => Math.min(TOTAL_TOKENS, prev + Number(amount)));
    } catch (err) {
      console.error('[Phantom] Error en la transacción:', err);
      // Si el error es una clave conocida, úsala; si no, muestra mensaje genérico
      const knownErrors = ['phantom-not-found', 'phantom-connect-error', 'presale-amount-invalid', 'presale-connect-required'];
      if (knownErrors.includes(err.message)) {
        setErrorMsgKey(err.message);
      } else {
        setErrorMsgKey('presale-tx-error');
      }
    }
    setLoading(false);
  };

  return (
  <>
    <header className="text-center mx-auto w-fit mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold gradient-text drop-shadow mb-3">{t['presale-page-title'] || 'Oficial $SOLS Preventa'}</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-6 w-fit mx-auto">
        {t['presale-page-subtitle'] || 'Asegura tu participación en el futuro del ecosistema Solstice. ¡El tiempo es limitado!'}
      </p>
    </header>
    <div className="flex flex-col items-center w-full gap-1 rounded-xl">
      <span className="text-base text-[#66fcf1] font-bold mb-1">{t['presale-launch-label'] || 'Lanzamiento de Solstice 200.000.000 SOLS'}</span>
      <span className="text-xs text-gray-200 font-semibold tracking-wide">
        {soldTokens === 0 ? (t['presale-raised'] || 'Recaudado: 0') : `${t['presale-raised'] || 'Recaudado:'} $${raised.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}`}
      </span>
      <span className="text-xs text-gray-300 font-mono">{t['presale-goal'] || '20,000 SOL Objetivo'}</span>
      <div className="w-full max-w-[220px] h-3 bg-[#23242a] rounded-full overflow-hidden relative border border-[#393b41] my-1">
        <div
          className="h-full bg-[#66fcf1] transition-all duration-700 ease-in-out shadow-lg"
          style={{
            width: percentSold === 0 ? '2%' : `${percentSold}%`,
            boxShadow: '0 0 8px 2px #66fcf1',
            borderRadius: '9999px',
            border: '2px solid #66fcf1',
            background: 'linear-gradient(90deg, #66fcf1 60%, #45a29e 100%)'
          }}
        />
      </div>
      <span className="text-xs text-[#66fcf1] font-semibold mt-2">{t['presale-price-label'] || 'Precio del Token: 0.0001 SOLS'}</span>
    </div>
    <div className="flex flex-row w-full justify-center items-center mt-2 mb-2">
          <Button
            onClick={handleConnectPhantom}
            className="w-fit px-4 py-2 text-base btn-primary shadow-md mx-auto"
            disabled={loading || walletType === 'phantom'}
          >
            {walletType === 'phantom' ? (t['connected'] || t['wallet-connected'] || 'Phantom conectada') : (t['presale-connect-phantom'] || t['dao-btn-connect-wallet'] || t['connect-phantom'] || 'Conectar Billetera Solana')}
          </Button>
        </div>
  <form onSubmit={handleBuy} className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto items-center">
          <div className="flex flex-col w-full items-center gap-4">
            <input
              type="number"
              min={minAmount}
              max={MAX_TOKENS_PER_WALLET / 10000}
              step="0.01"
              placeholder={t['presale-amount-placeholder'] || t['amount-placeholder'] || 'Cantidad a comprar'}
              className="p-3 bg-[#181a20] text-white rounded-xl border border-[#23242a] focus:outline-none focus:ring-2 focus:ring-[#66fcf1] w-[230px] text-center placeholder:text-white/40 placeholder:font-light mb-3 shadow-sm"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={loading || walletType !== 'phantom'}
              autoComplete="off"
            />
            <span className="text-xs text-gray-400 block text-center mb-1">
              {t['presale-max-tokens-wallet'] || 'Máximo = 4,000,000 tokens solstice por cartera'}
            </span>
            <span className="text-xs text-yellow-400 block text-center mb-2">
              {percentSold < 20 && 'Mínimo de compra: 0.5 SOL'}
              {percentSold >= 20 && percentSold < 50 && 'Mínimo de compra: 0.25 SOL'}
              {percentSold >= 50 && percentSold < 80 && 'Mínimo de compra: 0.1 SOL'}
              {percentSold >= 80 && 'Mínimo de compra: 0.01 SOL'}
            </span>
            {amount && !isNaN(amount) && Number(amount) > 0 && (
              <div className="w-full text-center mt-1">
                <span className="text-sm text-[#66fcf1] font-semibold">
                  Vas a recibir: <span className="font-bold">{Number(amount) * 10000} $SOLS</span> en tu wallet Phantom
                </span>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="px-6 py-3 text-base font-bold text-center text-black bg-[#66fcf1] rounded-2xl shadow-md hover:bg-[#45a29e] transition-all select-none"
            style={{background:'none',boxShadow:'none',padding:0,margin:0, color:'#0b0c10', backgroundColor:'#66fcf1'}}
            disabled={loading || walletType !== 'phantom' || !address}
          >
            {loading ? (t['presale-buy-loading'] || 'Procesando...') : (t['presale-buy'] || 'Comprar')}
          </Button>
        </form>
      {errorMsgKey && (
        <span style={{ color: '#e74c3c', display: 'block', textAlign: 'center', marginTop: 8 }}>
          {errorMsgKey === 'presale-max-tokens-wallet'
            ? (t['presale-max-tokens-wallet'] || 'Máximo = 4,000,000 tokens solstice por cartera')
            : errorMsgKey === 'min-solana-rent'
              ? `El monto mínimo permitido actualmente es ${minAmount} SOL.`
              : (t[errorMsgKey] || t['presale-tx-error'] || errorMsgKey)}
        </span>
      )}
      {successMsgKey && (
        <div className="bg-green-700/90 text-white text-sm text-center mt-2 py-2 rounded-2xl shadow border border-green-400 animate-fade-in w-fit mx-auto">
          {t[successMsgKey] || successMsgKey}
        </div>
      )}

    {/* Lista de compras recientes: transacciones reales */}
    <div className="w-full max-w-md mx-auto mt-8">
      <h3 className="text-lg font-bold text-[#66fcf1] mb-3 text-center">{t['presale-recent-purchases-title'] || 'Compras recientes'}</h3>
      <ul className="bg-[#181a20]/80 rounded-xl shadow border border-[#23242a] divide-y divide-[#23242a] min-h-[60px]">
        {loadingPurchases && (
          <li className="px-4 py-3 text-center text-gray-400">{t['presale-loading-txs'] || 'Cargando transacciones...'}</li>
        )}
        {!loadingPurchases && recentPurchases.length === 0 && (
          <li className="px-4 py-3 text-center text-gray-400">{t['presale-no-recent-purchases'] || 'No hay compras recientes.'}</li>
        )}
        {recentPurchases.map((tx, i) => (
          <li key={i} className="flex items-center justify-between px-4 py-3">
            <span className="font-mono text-gray-200 text-xs">{tx.wallet}</span>
            <span className="font-bold text-[#66fcf1]">{tx.tokens.toLocaleString()} $SOLS</span>
            <span className="text-xs text-gray-400">{tx.sol} SOL</span>
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default Presale;

