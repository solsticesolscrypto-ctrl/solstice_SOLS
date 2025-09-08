
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletConnector from './ui/WalletConnector';

// Se definen las traducciones y los elementos de navegación fuera del componente para mejorar el rendimiento.
const translations = {
  es: {
    'language-selector': 'Idioma:',
    'home': 'Inicio',
    'presale': 'Preventa',
    'whitepaper': 'Libro Blanco',
    'team': 'Equipo',
    'dao': 'DAO',
    'airdrop': 'Airdrop'
  },
  en: {
    'language-selector': 'Language:',
    'home': 'Home',
    'presale': 'Presale',
    'whitepaper': 'Whitepaper',
    'team': 'Team',
    'dao': 'DAO',
    'airdrop': 'Airdrop'
  },
  zh: {
    'language-selector': '语言：',
    'home': '主页',
    'presale': '预售',
    'whitepaper': '白皮书',
    'team': '团队',
    'dao': 'DAO',
    'airdrop': '空投'
  }
};

const navigationItems = [
  { id: 'home', labelKey: 'home' },
  { id: 'presale', labelKey: 'presale' },
  { id: 'whitepaper', labelKey: 'whitepaper' },
  { id: 'dao', labelKey: 'dao' },
  { id: 'airdrop', labelKey: 'airdrop' }
];

import { useLocation } from 'react-router-dom';

const Header = ({ currentPage, setCurrentPage, language, setLanguage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language] || translations['es'];
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Header estático (sin fijar). Efecto vacío preservado por si en el futuro se añaden dependencias.
  useEffect(() => {}, [language, currentPage]);

  // (Indicador deshabilitado para igualar la captura)

  // Gestiona la visibilidad de los controles de scroll en las pestañas
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const onResize = () => update();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
    };
  }, [language, currentPage]);

  const scrollTabs = (dir = 1) => {
    const el = tabsRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.6) * dir; // desplaza ~60% del ancho visible
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const prefetchMap = {
    presale: () => import('../components/Presale.jsx'),
    whitepaper: () => import('../components/Whitepaper.jsx'),
    dao: () => import('../components/DaoDashboard.jsx'),
    'create-proposal': () => import('../components/CreateProposal.jsx'),
  };

  const onNavClick = (id) => {
    // Navega solo con React Router
    if (id === 'home') {
      navigate('/');
    } else {
      navigate('/' + id);
    }
  };

  return (
  <header ref={headerRef} className="header-glass sticky top-0 z-50">
  {/* Contenedor alineado al ancho del sitio */}
  <div className="mx-auto w-full max-w-[var(--container-max)] relative flex flex-row items-center justify-between gap-2 px-2 md:px-6 py-2 overflow-x-auto no-scrollbar">
    <div className="flex flex-row items-center space-x-3 shrink-0 ml-0">
      <img
        src="/solstice-custom-logo.png"
        alt="Solstice Logo"
        width="48"
        height="48"
        className="w-12 h-12 rounded-full object-contain shrink-0 -ml-1 md:-ml-2"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          if (!e.currentTarget.dataset.fallback) {
            e.currentTarget.dataset.fallback = 'svg';
            e.currentTarget.src = '/solstice-logo.svg';
            return;
          }
          if (e.currentTarget.dataset.fallback === 'svg') {
            e.currentTarget.dataset.fallback = 'vite';
            e.currentTarget.src = '/vite.svg';
          }
        }}
      />
      <span className="text-2xl md:text-[28px] font-bold gradient-text">Solstice</span>
    </div>
  <nav className="flex flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-white font-medium text-[13px] sm:text-sm md:text-base whitespace-nowrap overflow-x-auto no-scrollbar scroll-smooth px-0 ml-0 select-none custom-vertical-tabs" aria-label="Main Navigation" role="navigation" ref={tabsRef} style={{ WebkitOverflowScrolling: 'touch' }}>
      {navigationItems.map((item) => {
        // Detecta la pestaña activa según la ruta actual
        let isActive = false;
        if (item.id === 'home' && (location.pathname === '/' || location.pathname === '')) isActive = true;
        else if (location.pathname === '/' + item.id) isActive = true;
        return (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            onMouseEnter={() => prefetchMap[item.id]?.()}
            onFocus={() => prefetchMap[item.id]?.()}
            data-id={item.id}
            className={`tab-btn relative z-10 bg-transparent px-1 sm:px-2 md:px-3 pb-1 pt-1 transition-colors snap-start ${
              isActive ? 'text-white' : 'text-white'
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#66fcf1]/40`}
            aria-label={t[item.labelKey]}
            aria-current={isActive ? 'page' : undefined}
          >
            {t[item.labelKey]}
          </button>
        );
      })}
    </nav>
  <div className="flex flex-col items-center gap-2 ml-auto pr-6">
      <img
        src="https://flagcdn.com/48x36/us.png"
        alt="English"
        title="English"
        className="object-cover cursor-pointer"
        style={{width:'16px',height:'12px'}} 
        loading="lazy"
        decoding="async"
        onClick={() => setLanguage('en')}
        aria-label="Seleccionar English"
      />
      <img
        src="https://flagcdn.com/48x36/es.png"
        alt="Español"
        title="Español"
        className="object-cover cursor-pointer"
        style={{width:'16px',height:'12px'}} 
        loading="lazy"
        decoding="async"
        onClick={() => setLanguage('es')}
        aria-label="Seleccionar Español"
      />
      <img
        src="https://flagcdn.com/48x36/cn.png"
        alt="中文"
        title="中文"
        className="object-cover cursor-pointer"
        style={{width:'16px',height:'12px'}} 
        loading="lazy"
        decoding="async"
        onClick={() => setLanguage('zh')}
        aria-label="选择中文"
      />
      <div className="ml-2">
        <WalletConnector />
      </div>
    </div>
  </div>
    </header>
  );
};

export default Header;
