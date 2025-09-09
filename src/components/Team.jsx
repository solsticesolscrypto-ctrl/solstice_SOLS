import React from 'react';
import jonathanImg from '../assets/jonathan-ceo.png';

const translations = {
  es: {
    title: 'Conoce al Equipo',
    subtitle: 'Un grupo dedicado de visionarios y expertos que trabajan para construir un futuro descentralizado en Solana.',
    comingSoon: 'PROXIMAMENTE',
    photo: 'Foto'
  },
  en: {
    title: 'Meet the Team',
    subtitle: 'A dedicated group of visionaries and experts working to build a decentralized future on Solana.',
    comingSoon: 'COMING SOON',
    photo: 'Photo'
  },
  zh: {
    title: '认识团队',
    subtitle: '一个由远见卓识者和专家组成的敬业团队，致力于在 Solana 上构建去中心化的未来。',
    comingSoon: '即将到来',
    photo: '照片'
  }
};

const Team = ({ language }) => {
  const t = translations[language];

  const TeamMember = ({ name, role, twitter, img, description, isLarge = false }) => (
    <div className={`flex flex-col items-center w-80 mx-auto ${isLarge ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}`}>
      <div className="w-[170px] h-[170px] rounded-full border-3 border-[#66fcf1] bg-[#111827] flex items-center justify-center mb-4 overflow-hidden">
        {img ? (
          <img src={img} alt={name} width="170" height="170" loading="lazy" decoding="async" className="rounded-full object-cover w-full h-full" />
        ) : (
          <span className="text-[#45a29e] text-3xl font-semibold">{t.photo}</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{name || t.comingSoon}</h3>
      <p className="text-[#66fcf1] font-medium mb-2">{role || t.comingSoon}</p>
      {twitter && (
        <a href={`https://twitter.com/${twitter.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mb-2">{twitter}</a>
      )}
      {description && (
        <p className="text-gray-300 text-sm text-center mb-2">{description}</p>
      )}
      <p className="text-gray-400 text-sm text-center">{t.comingSoon}</p>
    </div>
  );

  return (
    <section className="space-y-8">
      <div className="text-center narrow">
        <div className="section-header"></div>
  <h1 className="fluid-h1 font-extrabold gradient-text mb-4 section-title">{t.title}</h1>
  <p className="fluid-subtitle text-gray-400 text-content mb-8">{t.subtitle}</p>
        <div className="section-separator"></div>
      </div>

  <div className="flex flex-row gap-8 md:gap-10 section justify-center items-start overflow-x-auto w-full py-4">
    <TeamMember
      name="Jonathan"
      role="CEO & Founder"
      twitter="@glgdona"
      img={jonathanImg}
      description="Visionario y emprendedor en el sector blockchain. Experto en desarrollo de productos Web3, DeFi y ecosistemas Solana. Lidera el equipo de Solstice impulsando la innovación, la transparencia y la adopción de nuevas tecnologías descentralizadas."
    />
    <TeamMember />
    <TeamMember />
    <TeamMember />
  </div>
    </section>
  );
};

export default Team;
