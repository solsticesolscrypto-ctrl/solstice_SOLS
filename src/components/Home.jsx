import React from 'react';
import { translations } from '../i18n';
import Button from './ui/Button.jsx';
import { useNavigate } from 'react-router-dom';
const Home = ({ setCurrentPage, language }) => {
  const t = translations[language] || translations['es'];
  const navigate = useNavigate();

  return (
    <section>
      {/* Hero */}
      <div className="narrow min-h-[40vh] md:min-h-[50vh] flex flex-col items-center justify-center text-center">
        {/* Si agregas imágenes aquí, usa loading="lazy" y decoding="async" */}
        {/* Ejemplo:
        <img src="/ruta/hero.jpg" alt="Hero" width="320" height="180" loading="lazy" decoding="async" />
        */}
        <h1 className="fluid-h1 font-extrabold gradient-text tracking-tight mt-0">
          {t['hero-title']}
        </h1>
        <p className="fluid-subtitle text-gray-400 mt-3 md:mt-4 text-content">
          {t['hero-subtitle']}
        </p>
        <div className="mt-6 md:mt-8 w-full flex flex-row justify-center items-center gap-3">
          <Button onClick={() => navigate('presale')} size="lg" variant="primary" className="w-fit">
            {t['hero-btn-presale']}
          </Button>
          <Button onClick={() => navigate('whitepaper')} size="lg" variant="outline" className="w-fit">
            {t['hero-btn-whitepaper']}
          </Button>
        </div>
      </div>

      {/* Features */}
      <section className="section narrow text-center !my-8 md:!my-12">
        <div className="py-6 md:py-8 flex flex-col items-center">
          <div className="section-header !mb-3 md:!mb-4">
            <h2 className="fluid-h2 font-extrabold text-white text-center section-title">{t['features-title']}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-items-center gap-4 md:gap-6 w-full">
            {/* Si agregas imágenes en features, usa loading="lazy" y decoding="async" */}
            {/* Ejemplo:
            <img src="/ruta/feature1.jpg" alt="Feature 1" width="120" height="120" loading="lazy" decoding="async" />
            */}
            <div className="w-full max-w-[360px] p-2 sm:p-2 md:p-2 justify-self-center text-center md:self-start">
              <h3 className="text-2xl font-bold text-[#66fcf1] mb-2">{t['feature1-title']}</h3>
              <p className="text-gray-400 text-content">{t['feature1-text']}</p>
            </div>
            <div className="w-full max-w-[360px] p-2 sm:p-2 md:p-2 md:self-start justify-self-center text-center">
          <h3 className="text-2xl font-bold text-[#66fcf1] mb-2">{t['feature2-title']}</h3>
          <p className="text-gray-400 text-content">{t['feature2-text']}</p>
      </div>
  <div className="w-full max-w-[360px] p-2 sm:p-2 md:p-2 justify-self-center text-center md:self-start">
          <h3 className="text-2xl font-bold text-[#66fcf1] mb-2">{t['feature3-title']}</h3>
          <p className="text-gray-400 text-content">{t['feature3-text']}</p>
      </div>
      </div>
      </div>
    </section>
    
    {/* Tokenomics */}
  <section className="section text-left narrow !my-8 md:!my-12">
  <div className="section-header">
  <h2 className="fluid-h2 font-extrabold text-white text-center section-title">{t['tokenomics-title']}</h2>
      </div>
  <div className="card p-4 md:p-5">
    <div className="panel p-4 md:p-5">
  <div className="grid grid-cols-1 md:grid-cols-[1fr_max-content] items-center gap-3 sm:gap-4 md:gap-6">
                <div className="w-full min-w-0">
                <p className="text-gray-400 mb-4 text-content">
                  {t['tokenomics-intro']}
                </p>
                <ul className="list-enhanced text-gray-400 space-y-2 text-content">
                  <li>{t['tokenomics-total-supply']}</li>
                  <li>{t['tokenomics-presale']}</li>
                  <li>{t['tokenomics-rewards']}</li>
                  <li>{t['tokenomics-treasury']}</li>
                  <li>{t['tokenomics-liquidity']}</li>
                  <li>{t['tokenomics-airdrop']}</li>
                </ul>
                </div>
                <div className="justify-self-center md:justify-self-end self-center w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[360px]">
                  <svg viewBox="0 0 100 100" className="w-full h-auto" role="img" aria-label="Distribución de suministro" preserveAspectRatio="xMidYMid meet">
                    {/* Porciones (similares a la captura) */}
                    <path d="M50 50 L50 5 A45 45 0 0 1 88.5 35.5 Z" fill="#7b5ab7"></path>
                    <path d="M50 50 L88.5 35.5 A45 45 0 0 1 88.5 64.5 Z" fill="#5a78e5"></path>
                    <path d="M50 50 L88.5 64.5 A45 45 0 0 1 11.5 64.5 Z" fill="#3a9b9f"></path>
                    <path d="M50 50 L11.5 64.5 A45 45 0 0 1 50 5 Z" fill="#7ef7ee"></path>
                    {/* Anillo interior oscuro y anillo exterior gris para replicar el look */}
                    <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(0,0,0,0.75)" strokeWidth="5" />
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                  </svg>
                </div>
              </div>
            </div>
      </div>
    </section>
      {/* Team Section (migrado de Team.jsx) */}
      <section className="space-y-8 mt-16">
        <div className="text-center narrow">
          <div className="section-header"></div>
          <h1 className="fluid-h1 font-extrabold gradient-text mb-4 section-title">{t['team-title']}</h1>
          <p className="fluid-subtitle text-gray-400 text-content mb-8">{t['team-subtitle']}</p>
          <div className="section-separator"></div>
        </div>
        <div className="flex flex-row gap-8 md:gap-10 section justify-center items-start overflow-x-auto w-full py-4">
          {[1,2,3,4].map((_,i) => (
            <div key={i} className="flex flex-col items-center w-80 mx-auto">
              <div className="w-[170px] h-[170px] rounded-full border-3 border-[#66fcf1] bg-[#111827] flex items-center justify-center mb-4">
                <span className="text-[#45a29e] text-3xl font-semibold">{t['team-photo']}</span>
              </div>
              <p className="text-gray-400 text-lg mb-4">{t['team-comingSoon']}</p>
              <h3 className="text-2xl font-bold text-white mb-1">{t['team-comingSoon']}</h3>
              <p className="text-[#66fcf1] font-medium mb-4">{t['team-comingSoon']}</p>
              <p className="text-gray-400 text-sm text-center">{t['team-comingSoon']}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;