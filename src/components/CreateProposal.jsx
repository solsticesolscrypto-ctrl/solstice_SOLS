import React, { useState } from 'react';
import { translations } from '../i18n';
import Button from './ui/Button.jsx';

const CreateProposal = ({ setCurrentPage, language, showMessage }) => {
  const t = translations[language] || translations.es;
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phantomConnected, setPhantomConnected] = useState(false);
  const [phantomAddress, setPhantomAddress] = useState('');
  const [commissionPaid, setCommissionPaid] = useState(false);
  const [phantomError, setPhantomError] = useState('');

  // Lógica de conexión Phantom igual que en Presale
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
      try {
        await window.solana.disconnect();
      } catch (e) {}
    }
    setPhantomConnected(false);
    setPhantomAddress('');
    setCommissionPaid(false);
  };

  // Lógica para pagar comisión de 0.001 SOL
  const payCommission = async () => {
    setPhantomError('');
    if (!phantomConnected || !phantomAddress) {
      setPhantomError('Conecta Phantom primero.');
      return;
    }
    try {
      const { solana } = window;
      if (!solana || !solana.isPhantom) throw new Error('Phantom no está disponible');
      const web3 = await import('@solana/web3.js');
      const connection = new web3.Connection('https://api.mainnet-beta.solana.com');
      const destPubkey = new web3.PublicKey('3qxa32hbFKMTAesrtUBykqRcNnzGpix3F3QHQR5JcPBT');
      const fromPubkey = new web3.PublicKey(phantomAddress);
      const lamports = Math.floor(0.001 * 1e9); // 0.001 SOL
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
      const signed = await solana.signTransaction(tx);
      const sig = await connection.sendRawTransaction(signed.serialize());
      setCommissionPaid(true);
      setPhantomError('');
    } catch (err) {
      setPhantomError('Error al pagar la comisión: ' + (err.message || '')); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phantomConnected || !phantomAddress) {
      setPhantomError('Debes conectar Phantom para crear una propuesta.');
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
      // Simular envío de propuesta
      await new Promise(resolve => setTimeout(resolve, 1500));
      showMessage && showMessage(t['proposal-creation-success'] || t['proposal-creation-success'], 'success');
      setFormData({ title: '', description: '' });
      setTimeout(() => {
        setCurrentPage('dao');
      }, 1000);
    } catch (error) {
      console.error('Error al crear la propuesta:', error);
      const prefix = t['proposal-creation-error'] || 'Error creating proposal:';
      showMessage && showMessage(`${prefix} ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="text-center narrow">
        <div className="section-header"></div>
        <h1 className="fluid-h2 font-bold gradient-text mb-4">{t['proposal-form-page-title']}</h1>
        <p className="fluid-subtitle text-gray-400 max-w-2xl mx-auto mb-8">{t['proposal-form-page-subtitle']}</p>
      </div>
      <div className="narrow section">
        <div className="card p-6 md:p-8 flex flex-col gap-4 items-center">
          {/* Conexión Phantom */}
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
          {/* Pago comisión */}
          {phantomConnected && !commissionPaid && (
            <Button onClick={payCommission} size="md" className="w-fit bg-yellow-400 text-[#0b0c10] hover:bg-yellow-500 mt-2">
              {t['pay-commission'] || 'Pagar comisión 0.001 SOL'}
            </Button>
          )}
          {phantomError && (
            <div className="bg-red-700/80 text-white text-sm text-center mt-2 px-4 py-2 rounded-xl shadow border border-red-400 animate-pulse w-fit mx-auto">{phantomError}</div>
          )}
          {/* Formulario propuesta */}
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label 
                htmlFor="title" 
                className="block text-left text-white font-bold mb-2"
              >
                {t['proposal-form-title-label']}
              </label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
                required 
                className="input" 
                placeholder={t['proposal-form-title-placeholder'] || t['proposal-form-title-label']}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label 
                htmlFor="description" 
                className="block text-left text-white font-bold mb-2"
              >
                {t['proposal-form-desc-label']}
              </label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                rows="6" 
                required 
                className="textarea" 
                placeholder={t['proposal-form-desc-placeholder'] || t['proposal-form-desc-label']}
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" size="lg" className="w-full" loading={isSubmitting} disabled={!phantomConnected || !commissionPaid}>
              {t['proposal-form-btn-submit']}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProposal;
