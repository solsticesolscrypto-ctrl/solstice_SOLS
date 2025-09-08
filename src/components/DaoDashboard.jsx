import React, { useState, useEffect } from 'react';
import { translations } from '../i18n';
import Button from './ui/Button.jsx';

const DaoDashboard = ({ setCurrentPage, language, showMessage }) => {
  const t = translations[language] || translations.es;
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [phantomConnected, setPhantomConnected] = useState(false);
  const [phantomAddress, setPhantomAddress] = useState('');
  const [commissionPaid, setCommissionPaid] = useState(false);
  const [phantomError, setPhantomError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Lógica Phantom y comisión
  const connectPhantom = async () => {
    setPhantomError('');
    if (!window.solana || !window.solana.isPhantom) {
      setPhantomError(t['phantom-not-found']);
      return;
    }
    try {
      const resp = await window.solana.connect({ onlyIfTrusted: false });
      setPhantomConnected(true);
      setPhantomAddress(resp.publicKey.toString());
    } catch (err) {
      setPhantomError(t['phantom-connect-error']);
    }
  };

  const disconnectPhantom = async () => {
    if (window.solana && window.solana.isPhantom) {
      try { await window.solana.disconnect(); } catch (e) {}
    }
    setPhantomConnected(false);
    setPhantomAddress('');
    setCommissionPaid(false);
  };

  const payCommission = async () => {
    setPhantomError('');
    if (!phantomConnected || !phantomAddress) {
      setPhantomError(t['presale-connect-required']);
      return;
    }
    try {
      const { solana } = window;
      if (!solana || !solana.isPhantom) throw new Error('Phantom no está disponible');
  const web3 = await import('@solana/web3.js');
  const connection = new web3.Connection('https://mainnet.helius-rpc.com/?api-key=b4aa694f-00a7-49e2-8e19-83e793d508c1');
      const destPubkey = new web3.PublicKey('3qxa32hbFKMTAesrtUBykqRcNnzGpix3F3QHQR5JcPBT');
      const fromPubkey = new web3.PublicKey(phantomAddress);
      const lamports = Math.floor(0.001 * 1e9);
      const tx = new web3.Transaction().add(
        web3.SystemProgram.transfer({ fromPubkey, toPubkey: destPubkey, lamports })
      );
      tx.feePayer = fromPubkey;
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      const signed = await solana.signTransaction(tx);
      await connection.sendRawTransaction(signed.serialize());
      setCommissionPaid(true);
      setPhantomError('');
    } catch (err) {
      setPhantomError((t['commission-error'] || 'Error al pagar la comisión: ') + (err.message || ''));
    }
  };

  // Crear propuesta
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phantomConnected || !phantomAddress) {
      setPhantomError(t['presale-connect-required']);
      return;
    }
    if (!commissionPaid) {
      setPhantomError('Debes pagar la comisión de 0.001 SOL para crear una propuesta.');
      return;
    }
    if (!formData.title.trim() || !formData.description.trim()) {
      showMessage && showMessage(t['proposal-form-title-desc-empty'] || t['proposal-form-page-subtitle'], 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      // Añadir propuesta a la lista, con array de wallets que han votado
      setProposals(prev => [
        ...prev,
        { title: formData.title, description: formData.description, votes: 0, voters: [] }
      ]);
      showMessage && showMessage(t['proposal-creation-success'] || t['proposal-creation-success'], 'success');
      setFormData({ title: '', description: '' });
      setShowCreateForm(false);
    } catch (error) {
      const prefix = t['proposal-creation-error'] || 'Error creating proposal:';
      showMessage && showMessage(`${prefix} ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Votar propuesta (solo una vez por wallet)
  const voteProposal = (idx) => {
    if (!phantomAddress) return;
    setProposals(prev => prev.map((p, i) => {
      if (i !== idx) return p;
      if (p.votes >= 50) return p;
      if (p.voters && p.voters.includes(phantomAddress)) return p;
      return {
        ...p,
        votes: p.votes + 1,
        voters: [...(p.voters || []), phantomAddress]
      };
    }));
  };

  useEffect(() => {
    // Simular carga de propuestas
    setTimeout(() => {
      setProposals([]);
      setIsLoading(false);
    }, 2000);
  }, []);



  return (
    <section className="space-y-8">
      <div className="text-center narrow">
        <div className="section-header"></div>
        <h1 className="fluid-h2 font-bold gradient-text mb-4">{t['dao-page-title']}</h1>
        <p className="fluid-subtitle text-gray-400 text-content mb-8">{t['dao-page-subtitle']}</p>
      </div>

      {/* Título de propuestas activas fuera del contenedor */}
      <div className="w-full flex justify-center">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">{t['dao-active-proposals-title']}</h2>
      </div>

      {/* Create Proposal Button */}
      <div className="section text-center narrow">
      {/* Lógica de conexión y comisión antes de crear propuesta */}
      {!phantomConnected ? (
        <Button onClick={connectPhantom} size="lg" className="w-fit">
          {t['connect_phantom'] || 'Conectar Phantom'}
        </Button>
      ) : (
        <>
          <div className="text-xs text-[#66fcf1] font-mono mb-2">{t['phantom-connected']}: {phantomAddress.slice(0,7)}...{phantomAddress.slice(-7)}</div>
          <button
            onClick={disconnectPhantom}
            className="mt-1 px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700 transition font-bold shadow"
          >
            {t['disconnect'] || 'Desconectar'}
          </button>
        </>
      )}
      {phantomConnected && !commissionPaid && (
        <Button onClick={payCommission} size="md" className="w-fit bg-yellow-400 text-[#0b0c10] hover:bg-yellow-500 mt-2">
          {t['pay-commission'] || 'Pagar comisión 0.001 SOL'}
        </Button>
      )}
      {phantomError && (
        <div className="bg-red-700/80 text-white text-sm text-center mt-2 px-4 py-2 rounded-xl shadow border border-red-400 animate-pulse w-fit mx-auto">{phantomError}</div>
      )}
      <Button onClick={() => setShowCreateForm(true)} variant="outline" disabled={!phantomConnected || !commissionPaid}>
        {t['dao-btn-create-proposal']}
      </Button>
      {/* Formulario para crear propuesta */}
      {showCreateForm && (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl mx-auto mt-4">
          <div>
            <label htmlFor="title" className="block text-left text-white font-bold mb-2">{t['proposal-form-title-label']}</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="input" placeholder={t['proposal-form-title-placeholder'] || t['proposal-form-title-label']} disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor="description" className="block text-left text-white font-bold mb-2">{t['proposal-form-desc-label']}</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="6" required className="textarea" placeholder={t['proposal-form-desc-placeholder'] || t['proposal-form-desc-label']} disabled={isSubmitting} />
          </div>
          <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
            {t['proposal-form-btn-submit']}
          </Button>
        </form>
      )}
      </div>

      {/* Propuestas activas */}
      <div className="section narrow">
        <div className="card p-6 md:p-8">
          <div className="flex flex-col items-center">
            {isLoading ? (
              <div className="flex flex-col items-center text-gray-400">
                <svg className="w-10 h-10 animate-spin text-[#66fcf1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="mt-2 text-sm">{t['dao-loading-proposals']}</span>
              </div>
            ) : proposals.length === 0 ? (
              <p className="text-gray-500 text-content">{t['dao-no-proposals']}</p>
            ) : (
              <div className="w-full space-y-4">
                {proposals.map((proposal, index) => (
                  <div key={index} className="card p-6 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold text-white">{proposal.title}</h3>
                      <Button
                        size="sm"
                        onClick={() => voteProposal(index)}
                        disabled={proposal.votes >= 50 || (proposal.voters && proposal.voters.includes(phantomAddress))}
                        className="ml-4"
                      >
                        {proposal.voters && proposal.voters.includes(phantomAddress) ? 'Ya votaste' : 'Votar'}
                      </Button>
                    </div>
                    <p className="text-gray-400 mb-4 truncate">{proposal.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                      <span>{t['dao-proposal-status']} <span className="text-green-400">{t['dao-proposal-status-active']}</span></span>
                      <span>{t['dao-proposal-votes']} <span className="text-[#66fcf1] font-bold">{proposal.votes || 0}</span> de 50</span>
                    </div>
                    <div className="w-full h-2 bg-[#2c2f33] rounded-full overflow-hidden">
                      <div className="h-full bg-[#66fcf1] transition-all duration-500 ease-out" style={{ width: `${((proposal.votes || 0) / 50) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaoDashboard;
