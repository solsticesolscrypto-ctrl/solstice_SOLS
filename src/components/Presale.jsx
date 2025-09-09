
import React, { useState, useEffect } from 'react';
import Button from './ui/Button.jsx';
import { fetchRecentPurchases } from '../utils/fetchRecentPurchases';
import { useConnect, useAccounts, useDisconnect } from '@phantom/react-sdk';
import { PublicKey, Connection, SystemProgram, Transaction } from '@solana/web3.js';

const DEST_SOL = '3qxa32hbFKMTAesrtUBykqRcNnzGpix3F3QHQR5JcPBT';
// const url = `https://solscan.io/tx/${txid}`; // Uncomment and use if needed

const PROGRAM_ID = "ETGynhejRFgLWFLxVqwX3rPdMa1Gwt5AoqE77GjhvSHZ";
// Usar este ID al construir instrucciones para llamar a tu programa


const Presale = ({ t }) => {
  const [amount, setAmount] = useState('');
  const MAX_TOKENS_PER_WALLET = 4000000;
  const [successMsgKey, setSuccessMsgKey] = useState('');
  const [errorMsgKey, setErrorMsgKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const TOTAL_TOKENS = 1000000;
  const [soldTokens, setSoldTokens] = useState(0);
  const percentSold = Math.min(100, Math.round((soldTokens / TOTAL_TOKENS) * 100));
  function getMinAmount(p) {
    if (p < 20) return 0.5;
    if (p < 50) return 0.25;
    if (p < 80) return 0.1;
    return 0.01;
  }
  const minAmount = getMinAmount(percentSold);
  const TOKEN_PRICE_USD = 0.01;
  const raised = soldTokens * TOKEN_PRICE_USD;

  // Phantom React SDK hooks
  const { connect, isLoading: isConnecting } = useConnect();
  const accounts = useAccounts();
  const { disconnect } = useDisconnect();
  const isConnected = accounts && accounts.length > 0;
  const address = isConnected ? accounts[0].address : '';

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

  const handleConnectPhantom = async () => {
    setErrorMsgKey('');
    try {
      await connect();
    } catch (err) {
      setErrorMsgKey('phantom-connect-error');
    }
  };

  const handleDisconnectPhantom = async () => {
    try {
      await disconnect();
    } catch (e) {}
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    setSuccessMsgKey('');
    setErrorMsgKey('');
    if (!isConnected || !address) {
      setErrorMsgKey('presale-connect-required');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) < minAmount) {
      setErrorMsgKey('min-solana-rent');
      return;
    }
    if (Number(amount) * 10000 > MAX_TOKENS_PER_WALLET) {
      setErrorMsgKey('presale-max-tokens-wallet');
      return;
    }
    setLoading(true);
    try {
      const connection = new Connection(`https://mainnet.helius-rpc.com/?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`);
      const destPubkey = new PublicKey(DEST_SOL);
      const fromPubkey = new PublicKey(address);
      const lamports = Math.floor(Number(amount) * 1e9);
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey: destPubkey,
          lamports,
        })
      );
      tx.feePayer = fromPubkey;
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      // Solicitar firma usando el SDK de Phantom
      const signed = await accounts[0].signTransaction(tx);
      const sig = await connection.sendRawTransaction(signed.serialize());
      setSuccessMsgKey('presale-success');
      setSoldTokens(prev => Math.min(TOTAL_TOKENS, prev + Number(amount)));
    } catch (err) {
      setErrorMsgKey('presale-tx-error');
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
      {!isConnected ? (
        <Button
          onClick={handleConnectPhantom}
          className="w-fit px-4 py-2 text-base btn-primary shadow-md mx-auto"
          disabled={loading || isConnecting}
        >
          {isConnecting ? 'Conectando...' : (t['presale-connect-phantom'] || t['dao-btn-connect-wallet'] || t['connect-phantom'] || 'Conectar Billetera Solana')}
        </Button>
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#66fcf1] mb-1">{address}</span>
          <Button onClick={handleDisconnectPhantom} className="w-fit px-3 py-1 text-xs btn-primary shadow-md mx-auto mb-2">Desconectar</Button>
        </div>
      )}
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
              style={{ color: '#fff' }}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              disabled={loading || !isConnected}
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
            disabled={loading || !isConnected || !address}
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

