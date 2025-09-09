// ...existing code...

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { translations } from '../i18n';

const Whitepaper = ({ language }) => {
  const base = translations[language] || translations.es;
  const wp = base.whitepaper || base; // fallback si no existe bloque whitepaper

  // Elementos del índice y estado de sección activa
  // Usar el array toc de i18n.js para mostrar los títulos numerados y completos
  const tocOrder = [
    'intro',
    'vision',
    'tech',
    'tokenomics',
    'roadmap',
    'governance',
    'security',
    'conclusion',
    'transparencia',
    'presale',
    'dao',
    'faq',
    'legal'
  ];
  const tocItems = useMemo(() => tocOrder.map((id, idx) => ({
    id,
    // Si existe el array toc, usar el título numerado de ahí, si no, usar el de la sección
    title: (wp.toc && wp.toc[idx]) || wp.sections?.[id]?.title || id
  })), [wp]);

  const [activeId, setActiveId] = useState(tocItems[0]?.id || 'introduccion');
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Scrollspy usando IntersectionObserver sin cambiar el hash global
  useEffect(() => {
    const sectionEls = tocItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sectionEls.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        // Activa cuando el título esté en el tercio superior de la pantalla
        rootMargin: '-25% 0px -65% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1]
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => {
      sectionEls.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [tocItems]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Deep-linking por ?sec= eliminado a petición.

  // Botón de copiar enlace eliminado a petición: mantenemos la función fuera
  // para no dejar referencias, pero no se usa.

  // Barra de progreso de lectura
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    let ticking = false;

  const compute = () => {
      const docTop = window.scrollY || document.documentElement.scrollTop || 0;
      const start = el.offsetTop;
      const end = start + el.offsetHeight - window.innerHeight;
      const denom = Math.max(end - start, 1);
      const raw = (docTop - start) / denom;
      const pct = Math.min(100, Math.max(0, Math.round(raw * 100)));
      setProgress(pct);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(compute);
        ticking = true;
      }
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="space-y-8 text-left narrow">
      <div className="text-center narrow">
        <div className="section-header"></div>
        <h1 className="fluid-h1 font-bold gradient-text mb-4 section-title">{base['whitepaper-page-title'] || 'Whitepaper'}</h1>
        <p className="fluid-subtitle text-gray-400 text-content mb-8">{base['whitepaper-page-subtitle'] || ''}</p>
      </div>
      {/* Índice centrado y bien presentado para todos los dispositivos */}
      <div className="w-full flex flex-col items-center justify-center mb-8">
        <h2 className="text-lg font-bold text-[#66fcf1] mb-3">{wp.tocTitle || 'Table of Contents'}</h2>
        <ul className="text-base md:text-lg text-gray-200 space-y-1 list-none text-center">
          {tocItems.map((item, idx) => {
            // Si el título ya empieza por número, mostrarlo tal cual
            const hasManualNumber = /^\d+\./.test(item.title.trim());
            return (
              <li key={item.id}>
                {hasManualNumber ? item.title : `${idx + 1}. ${item.title}`}
              </li>
            );
          })}
        </ul>
      </div>
      {/* Layout: Índice a la izquierda en desktop, contenido a la derecha (solo para navegación sticky) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contenido principal */}
        <div ref={contentRef} className="md:col-span-9">
          {/* Barra de progreso de lectura */}
          <div className="sticky top-0 z-10 mb-4">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--brand-2)] to-[var(--brand)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* Renderizar todas las secciones del índice dinámicamente */}
          {tocItems.map((item) => {
            // Renderizado especial para roadmap y tokenomics
            if (item.id === 'tokenomics') {
              return (
                <section id="tokenomics" className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white mb-4">{wp.sections.tokenomics.title}</h2>
                  <div className="text-content text-gray-300 mb-2">
                    <strong className="text-[#66fcf1]">{wp.sections.tokenomics.distribution}</strong>
                  </div>
                  <ul className="text-content list-disc list-inside space-y-2 text-gray-400 mb-8">
                    <li>{wp.sections.tokenomics.totalSupply}</li>
                    <li>{wp.sections.tokenomics.presale}</li>
                    <li>{wp.sections.tokenomics.rewards}</li>
                    <li>{wp.sections.tokenomics.treasury}</li>
                    <li>{wp.sections.tokenomics.liquidity}</li>
                    <li>{wp.sections.tokenomics.airdrop}</li>
                  </ul>
                </section>
              );
            }
            if (item.id === 'roadmap') {
              return (
                <section id="roadmap" className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white">{wp.sections.roadmap.title}</h2>
                  <ul className="text-content list-disc list-inside space-y-4 text-gray-400 mt-4">
                    <li><strong className="text-[#66fcf1]">{wp.sections.roadmap.phase1}</strong></li>
                    <li><strong className="text-[#66fcf1]">{wp.sections.roadmap.phase2}</strong></li>
                    <li><strong className="text-[#66fcf1]">{wp.sections.roadmap.phase3}</strong></li>
                  </ul>
                </section>
              );
            }
            if (item.id === 'transparencia') {
              return (
                <section id="transparencia" className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white mb-4">{wp.sections.transparencia.title}</h2>
                  <div className="text-content text-gray-300 mb-8" dangerouslySetInnerHTML={{ __html: wp.sections.transparencia.content }} />
                </section>
              );
            }
            if (item.id === 'presale') {
              return (
                <section id="presale" className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white mb-4">{wp.sections.presale.title}</h2>
                  <div className="text-content text-gray-300 space-y-4">
                    {wp.sections.presale.content.map((item, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </div>
                </section>
              );
            }
            if (item.id === 'dao') {
              return (
                <section id="dao" className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white mb-4">{wp.sections.dao.title}</h2>
                  <div className="text-content text-gray-300 space-y-4">
                    {wp.sections.dao.content.map((item, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </div>
                </section>
              );
            }
            if (item.id === 'faq') {
              return (
                <section id="faq" className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white mb-4">{wp.sections.faq.title}</h2>
                  <div className="text-content text-gray-300 space-y-4">
                    {wp.sections.faq.content.map((item, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </div>
                </section>
              );
            }
            if (item.id === 'legal') {
              return (
                <section id="legal" className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white mb-4">{wp.sections.legal.title}</h2>
                  <div className="text-content text-gray-300 space-y-4">
                    {wp.sections.legal.content.map((item, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </div>
                </section>
              );
            }
            // Secciones simples (intro, vision, tech, governance, security, conclusion)
            // governance y security tienen contenido string, no array
            if (['governance', 'security', 'intro', 'vision', 'tech', 'conclusion'].includes(item.id)) {
              return (
                <section id={item.id} className="section narrow" key={item.id}>
                  <h2 className="text-4xl font-bold text-white mb-4">{wp.sections[item.id]?.title || item.title}</h2>
                  <div className="text-content text-gray-300 mb-8">
                    <p>{wp.sections[item.id]?.content || ''}</p>
                  </div>
                </section>
              );
            }
            // fallback: mostrar sección aunque no haya contenido definido
            return (
              <section id={item.id} className="section narrow" key={item.id}>
                <h2 className="text-4xl font-bold text-white mb-4">{item.title}</h2>
                <div className="text-content text-gray-400 mb-8 italic">Contenido próximamente.</div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Whitepaper;
