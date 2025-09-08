import React, { useState, useEffect } from 'react';

function Airdrop({ t }) {
  // Participantes reales registrados
  // Si en el futuro se muestran imágenes de usuario o premios, usar loading="lazy" y decoding="async" para optimizar
  const [participants, setParticipants] = useState(() => {
    const saved = localStorage.getItem('airdrop_participants');
    return saved ? JSON.parse(saved) : [];
  });
  // Guardar participantes en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('airdrop_participants', JSON.stringify(participants));
  }, [participants]);
  const [wallet, setWallet] = useState('');
  const [twitterUser, setTwitterUser] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [twitterChecked, setTwitterChecked] = useState(false);
  const [retweetChecked, setRetweetChecked] = useState(false);
  const [twitterLinkClicked, setTwitterLinkClicked] = useState(false);
  const [retweetLinkClicked, setRetweetLinkClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!twitterUser || twitterUser.length < 3) {
      setMessage('Por favor, ingresa tu usuario de Twitter.');
      return;
    }
    if (!/^([1-9A-HJ-NP-Za-km-z]{32,44})$/.test(wallet)) {
      setMessage('Wallet de Solana no válida');
      return;
    }
    setParticipants(prev => [
      ...prev,
      { wallet, twitter: twitterUser }
    ]);
    setMessage('¡Wallet registrada para el airdrop!');
    setWallet('');
    setTwitterUser('');
  };

  return (
  <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold text-[#66fcf1] mb-6">{t['airdrop-title']}</h1>
      <div className="max-w-2xl text-gray-200 text-base mb-8 text-center">
        <strong className="block text-lg text-[#66fcf1] mb-2">{t['airdrop-hero-title']}</strong>
        <p className="mb-2">{t['airdrop-hero-desc1']}</p>
        <p className="mb-2 font-semibold text-[#66fcf1]">{t['airdrop-why-title']}</p>
        <p className="mb-2">{t['airdrop-why-desc']}</p>
        <ul className="list-disc list-inside mb-2 text-left mx-auto" style={{maxWidth:'600px'}}>
          <li><strong>{t['airdrop-why-pioneer'].split(':')[0]}:</strong> {t['airdrop-why-pioneer'].split(':')[1]}</li>
          <li><strong>{t['airdrop-why-governance'].split(':')[0]}:</strong> {t['airdrop-why-governance'].split(':')[1]}</li>
          <li><strong>{t['airdrop-why-utility'].split(':')[0]}:</strong> {t['airdrop-why-utility'].split(':')[1]}</li>
        </ul>
        <p className="mb-2 font-semibold text-[#66fcf1]">{t['airdrop-how-title']}</p>
        <p className="mb-2">{t['airdrop-how-desc']}</p>
        <p className="mt-4">{t['airdrop-join-desc']}</p>
      </div>
      <p className="text-gray-400 text-center mb-8">
        {t['airdrop-steps-title']}<br/>
        {t['airdrop-steps-desc']}<br/>
        <span className="block mt-4 text-left">
          <span>1. </span><a
            href="https://x.com/SolsticeSols"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[#66fcf1] underline ${twitterLinkClicked ? 'font-bold' : ''}`}
            onClick={() => setTwitterLinkClicked(true)}
          >{t['airdrop-step1'].replace(/^\d+\.\s*/, '')}</a> <br/>
          <span>2. </span><a
            href="https://x.com/SolsticeSols"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[#66fcf1] underline ${retweetLinkClicked ? 'font-bold' : ''}`}
            onClick={() => setRetweetLinkClicked(true)}
          >{t['airdrop-step2'].replace(/^\d+\.\s*/, '')}</a>
        </span>
      </p>
      {step === 1 && (
        <div className="flex flex-col items-start gap-4 mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={twitterChecked} onChange={e => setTwitterChecked(e.target.checked)} />
            <span className="text-gray-300">{t['airdrop-checkbox-follow']}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={retweetChecked} onChange={e => setRetweetChecked(e.target.checked)} />
            <span className="text-gray-300">{t['airdrop-checkbox-retweet']}</span>
          </label>
          <button
            className={`mt-4 px-6 py-2 rounded-lg font-bold text-lg transition w-fit ${twitterChecked && retweetChecked ? 'bg-gradient-to-r from-[#45a29e] to-[#66fcf1] text-[#0b0c10] hover:scale-105' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
            disabled={!(twitterChecked && retweetChecked)}
            onClick={() => setStep(2)}
          >
            {t['airdrop-continue']}
          </button>
        </div>
      )}
      {step === 2 && (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-fit">
            <input
              type="text"
              placeholder={t['airdrop-twitter-placeholder']}
              value={twitterUser}
              onChange={e => setTwitterUser(e.target.value)}
              className="border border-[#45a29e] bg-[#0b0c10] rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#66fcf1]/40 transition"
              autoComplete="off"
              maxLength={30}
              style={{ minWidth: '220px' }}
              required
              aria-label="Usuario de Twitter"
            />
            <input
              type="text"
              placeholder={t['airdrop-wallet-placeholder']}
              value={wallet}
              onChange={e => setWallet(e.target.value)}
              className="border border-[#45a29e] bg-[#0b0c10] rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#66fcf1]/40 transition"
              autoComplete="off"
              maxLength={44}
              style={{ minWidth: '220px' }}
              required
              aria-label="Wallet de Solana"
            />
            <button
              type="submit"
              className={`bg-gradient-to-r from-[#45a29e] to-[#66fcf1] text-[#0b0c10] px-8 py-3 rounded-lg font-bold text-lg shadow hover:scale-105 transition w-fit mt-4 ${twitterLinkClicked && retweetLinkClicked ? '' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              disabled={!(twitterLinkClicked && retweetLinkClicked)}
            >
              {t['airdrop-btn-participate']}
            </button>
            {message && <p className="text-[#66fcf1] text-center font-semibold mt-4">{message}</p>}
          </form>

          {/* Tabla de participantes */}
          <div className="mt-10 w-full flex flex-col items-center">
            <h3 className="text-lg font-bold text-[#66fcf1] mb-2">{t['airdrop-participants-title']}</h3>
            <div className="w-full max-w-xl overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-[340px] w-full bg-[#1f2833] rounded-lg text-sm">
                <thead className="sticky top-0 bg-[#162025] z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-[#66fcf1] font-bold w-32 min-w-[120px]">{t['airdrop-table-twitter']}</th>
                    <th className="px-4 py-3 text-left text-[#66fcf1] font-bold w-64 min-w-[200px]">{t['airdrop-table-wallet']}</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-4 py-4 text-gray-400 text-center">Aún no hay participantes registrados.</td>
                    </tr>
                  ) : (
                    participants.map((p, idx) => (
                      <tr key={idx} className={
                        `border-t border-[#45a29e]/30 ${idx % 2 === 0 ? 'bg-[#232b33]' : 'bg-[#1f2833]'} hover:bg-[#28343d] transition`}
                      >
                        <td className="px-4 py-3 text-gray-200 font-mono w-64 min-w-[200px] max-w-[320px] truncate">
                          <a
                            href={`https://solscan.io/token/${p.wallet}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#66fcf1] underline hover:text-[#45a29e]"
                            title={p.wallet}
                          >
                            {p.wallet.length > 16 ? `${p.wallet.slice(0, 6)}...${p.wallet.slice(-4)}` : p.wallet}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-gray-200 w-32 min-w-[120px]">@{p.twitter}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
  </section>
  );
}

export default Airdrop;
